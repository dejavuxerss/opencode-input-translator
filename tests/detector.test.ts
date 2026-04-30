import { describe, expect, test } from 'bun:test';
import { isEnglish } from '../src/detector.ts';

describe('isEnglish', () => {
  test('English text → true', () => {
    expect(isEnglish('Please refactor this function')).toBe(true);
  });

  test('Korean text → false', () => {
    expect(isEnglish('이 함수를 리팩토링해 주세요')).toBe(false);
  });

  test('Japanese text → false', () => {
    expect(isEnglish('この関数をリファクタリングして')).toBe(false);
  });

  test('Chinese text → false', () => {
    expect(isEnglish('请重构这个函数')).toBe(false);
  });

  test('Cyrillic text → false', () => {
    expect(isEnglish('Пожалуйста, рефакторинг')).toBe(false);
  });

  test('Arabic text → false', () => {
    expect(isEnglish('الرجاء إعادة هيكلة')).toBe(false);
  });

  test('Mixed Korean+English (non-Latin majority) → false', () => {
    expect(isEnglish('이 함수를 refactor 해줘')).toBe(false);
  });

  test('Empty string → true', () => {
    expect(isEnglish('')).toBe(true);
  });

  test('Whitespace only → true', () => {
    expect(isEnglish('   \t\n  ')).toBe(true);
  });

  test('Numbers/symbols only → true', () => {
    expect(isEnglish('123 + 456 = 789')).toBe(true);
  });

  test('Turkish text (with Turkish chars) → false', () => {
    expect(isEnglish('Merhaba! Bu dosyayı oku ve bana ne olduğunu söyle')).toBe(
      false,
    );
  });

  test('Turkish text (with ş, ç, ğ) → false', () => {
    expect(
      isEnglish(
        'Şu kod parçasını refactor eder misin? Çok karmaşık görünüyor.',
      ),
    ).toBe(false);
  });

  test('Turkish text (with ü, ö, İ) → false', () => {
    expect(isEnglish('İşte bu projenin mimarisini anlat')).toBe(false);
  });

  test('Code-like ASCII → true', () => {
    expect(isEnglish('const x = 42; // hello')).toBe(true);
  });
});
