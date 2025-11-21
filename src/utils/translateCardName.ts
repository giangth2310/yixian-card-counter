import termsData from '../data/terms.json';

// Build a mapping from Chinese card names to Vietnamese
const cardNameMapping: Record<string, string> = {};

// Process terms.json to build the translation map
termsData.forEach((term: any) => {
  if (term.Languages && term.Languages.length >= 2) {
    const chineseName = term.Languages[0]; // Chinese (Simplified)
    const vietnameseName = term.Languages[1]; // Vietnamese
    if (chineseName && vietnameseName && chineseName !== vietnameseName) {
      cardNameMapping[chineseName] = vietnameseName;
    }
  }
});

/**
 * Translate a card name from Chinese to Vietnamese
 * @param chineseName - The Chinese card name
 * @returns The Vietnamese translation, or the original name if not found
 */
export function translateCardName(chineseName: string): string {
  return cardNameMapping[chineseName] || chineseName;
}

export default translateCardName;

