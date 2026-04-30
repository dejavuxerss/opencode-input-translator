// Turkish-specific characters not used in English
const TURKISH_CHARS = new Set([
  0x00e7,
  0x00c7, // ç, Ç
  0x011f,
  0x011e, // ğ, Ğ
  0x0131,
  0x0130, // ı, İ
  0x00f6,
  0x00d6, // ö, Ö
  0x015f,
  0x015e, // ş, Ş
  0x00fc,
  0x00dc, // ü, Ü
]);

export function isEnglish(text: string): boolean {
  if (!text || text.trim().length === 0) return true;

  let prose = text.replace(/```[\s\S]*?```/g, ' ');
  prose = prose.replace(/`[^`]*`/g, ' ');

  let latinCount = 0;
  let nonLatinCount = 0;
  let turkishCount = 0;

  for (const ch of prose) {
    const cp = ch.codePointAt(0);
    if (cp === undefined) continue;

    if (TURKISH_CHARS.has(cp)) {
      turkishCount++;
    } else if (
      (cp >= 0x0041 && cp <= 0x005a) || // A-Z
      (cp >= 0x0061 && cp <= 0x007a) || // a-z
      (cp >= 0x00c0 && cp <= 0x024f) // Latin Extended
    ) {
      latinCount++;
    } else if (
      (cp >= 0x4e00 && cp <= 0x9fff) || // CJK
      (cp >= 0xac00 && cp <= 0xd7af) || // Hangul
      (cp >= 0x0400 && cp <= 0x04ff) || // Cyrillic
      (cp >= 0x0600 && cp <= 0x06ff) || // Arabic
      (cp >= 0x0e00 && cp <= 0x0e7f) || // Thai
      (cp >= 0x0900 && cp <= 0x097f) // Devanagari
    ) {
      nonLatinCount++;
    }
  }

  const total = latinCount + nonLatinCount + turkishCount;
  if (total === 0) return true;

  // If Turkish-specific characters are >= 5% of total, classify as non-English
  if (turkishCount > 0 && turkishCount / total >= 0.05) return false;

  return latinCount / total >= 0.7;
}
