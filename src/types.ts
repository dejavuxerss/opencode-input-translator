export interface TranslatorConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  /** Whether the model supports structured JSON output (default: true). Set false for models like MiniMax. */
  structuredOutput?: boolean;
}

export interface CodeBlock {
  placeholder: string;
  original: string;
}

export interface TranslationResult {
  translated: boolean;
  text: string;
}
