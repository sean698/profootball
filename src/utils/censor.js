import { Filter } from 'glin-profanity';

// Configure the filter
const filter = new Filter({
  allLanguages: true,
  replaceWith: '***',
  allowObfuscatedMatch: true,
});

/**
 * Censors profane words in the input text.
 * @param {string} text - The text to be censored.
 * @returns {string} - The censored text.
 */
export function censorText(text) {
  return filter.checkProfanity(text).processedText;
} 