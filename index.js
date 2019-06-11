const { stringManipulation, fuzzy } = require("./methods");

const highlightTerm = (text, wordToBeHighlighted, shouldUseFallback = true) => {
  const trimmedText = text
    .replace(/(<([^>]+)>)/gi, item =>
      item
        .split("")
        .map(() => "_")
        .join("")
    )
    .replace(/[^A-Z0-9]/gi, "_")
    .toLowerCase();
  // Attempt with string manipulation
  const termsLength = stringManipulation(trimmedText, wordToBeHighlighted);
  // Fallback with fuzzy if string manipulation didn't work
  if (!termsLength.length > 0 && shouldUseFallback) {
    termsLength.push(...fuzzy(trimmedText, wordToBeHighlighted));
  }
  // Get the actual terms that will be highlighted
  const finalTerms = termsLength.map(objectTerm => {
    const { initPosition, finalPosition } = objectTerm;
    const term = text.substring(initPosition, finalPosition);
    return term;
  });

  // Highlight terms
  finalTerms.forEach(term => {
    text = text.replace(term, "<mark>$&</mark>");
  });
  return text;
};

module.exports = {
  highlightTerm
};
