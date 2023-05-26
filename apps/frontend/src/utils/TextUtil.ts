/**
 * Uppercase the first letter
 * @param text
 */
const upFirstChar = (text: string): string => {
  if (text === undefined || text.length === 0) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
};

export { upFirstChar };
