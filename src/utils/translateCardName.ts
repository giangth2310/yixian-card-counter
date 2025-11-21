import termsData from '../data/terms.json';

// Build a mapping from Chinese card names to Vietnamese
const cardNameMapping: Record<string, string> = {};

/**
 * Normalize different dot/bullet characters to a standard one
 * Handles: • (U+2022), · (U+00B7), ● (U+25CF), and others
 */
function normalizeDots(text: string): string {
  return text.replace(/[•·●・]/g, '•');
}

// Process terms.json to build the translation map
termsData.forEach((term: any) => {
  if (term.Languages && term.Languages.length >= 2) {
    const chineseName = term.Languages[0]; // Chinese (Simplified)
    const vietnameseName = term.Languages[1]; // Vietnamese
    if (chineseName && vietnameseName && chineseName !== vietnameseName) {
      const normalizedKey = normalizeDots(chineseName);
      cardNameMapping[normalizedKey] = vietnameseName;
    }
  }
});

/**
 * Translate a card name from Chinese to Vietnamese
 * @param chineseName - The Chinese card name
 * @returns The Vietnamese translation, or the original name if not found
 */
export function translateCardName(chineseName: string): string {
  const normalizedName = normalizeDots(chineseName);
  return cardNameMapping[normalizedName] || chineseName;
}

export default translateCardName;

