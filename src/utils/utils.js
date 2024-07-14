// Generate a random ID
const generateID = () => {
  return `_${crypto.getRandomValues(new Uint32Array(1))[0].toString(36)}`;
};

// Normalize a string
const normalizeText = (text) => {
  if (text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }
  return ""; // Retourner une chaîne vide si text est undefined ou null
};
export { generateID, normalizeText };
