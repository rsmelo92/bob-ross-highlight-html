const Fuse = require("fuse.js");

const highlightTerm = (text, wordToBeHighlighted) => {
  const trimmedText = text
    .replace(/(<([^>]+)>)/gi, item =>
      item
        .split("")
        .map(() => "_")
        .join("")
    )
    .replace(/[^A-Z0-9]/gi, "_")
    .toLowerCase();
  const regex = wordToBeHighlighted
    .split("")
    .map((letter, index, array) => {
      if (array.length === index + 1) {
        return letter;
      }
      if (letter.match(/[^A-Z0-9]/gi)) {
        return `${letter}*_*?`
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/gi, "");
      }
      return `${letter}_*`;
    })
    .join("");
  const pattern = new RegExp(regex, "gi");
  // Get final and init position for the underline terms
  const termsLength = [];
  trimmedText.replace(pattern, item => {
    const regexExec = pattern.exec(trimmedText);
    termsLength.push({
      initPosition: regexExec.index,
      finalPosition: regexExec.index + item.length
    });
    return item;
  });
  // Get the actual terms that will be highlighted
  const finalTerms = termsLength.map(objectTerm => {
    const { initPosition, finalPosition } = objectTerm;
    const term = text.substring(initPosition, finalPosition);
    return term;
  });
  // Highlight terms
  finalTerms.forEach(term => {
    const finalPattern = new RegExp(
      `(?!<mark[^>]*?>)${term}(?![^<]*?<\/mark>)`,
      "gi"
    );
    text = text.replace(finalPattern, "<mark>$&</mark>");
  });
  return text;
};

module.exports = {
  highlightTerm
};
