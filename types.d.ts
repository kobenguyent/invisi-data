export type MaskingPattern = {
  name: string;
  regex: RegExp;
  mask: string;
};

/**
 * Masks sensitive data in a given string using predefined and custom patterns.
 * @param input - The input string to mask.
 * @param customPatterns - Optional custom masking patterns to apply.
 * @returns The masked string with sensitive data replaced.
 */
export function maskSensitiveData(
  input: string,
  customPatterns?: MaskingPattern[]
): string;
