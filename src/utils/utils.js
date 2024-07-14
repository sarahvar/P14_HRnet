// Generate a random ID
const generateID = () => {
  return `_${crypto.getRandomValues(new Uint32Array(1))[0].toString(36)}`;
};

// Normalize a string
const normalizeText = text => text
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .trim();

export { generateID, normalizeText };
