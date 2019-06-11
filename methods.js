const stringManipulation = (trimmedText, wordToBeHighlighted) => {
  // Set regex to be found
  const regex = wordToBeHighlighted
    .replace(/\s/gi, "")
    .split("")
    .map((letter, index, array) => {
      if (array.length === index + 1) {
        return letter;
      }
      if (letter.match(/[^A-Z0-9 ]/gi)) {
        return `${letter}*_*?`
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/gi, "");
      }
      return `${letter}_*`;
    })
    .join("");
  // Find regex
  const pattern = new RegExp(regex, "gi");
  // Get final and init position for the underline terms
  return getPositions(trimmedText, pattern);
};

const fuzzy = (trimmedText, wordToBeHighlighted) => {
  // import Fuzzy package
  const stringSimilarity = require("string-similarity");
  let similarity;
  let higherSimilarity = 0.00000001;
  const similars = [];
  // Test similarities and get second higher one
  trimmedText.split("").reduce((a, b) => {
    similarity = stringSimilarity.compareTwoStrings(
      wordToBeHighlighted.normalize("NFD").replace(/[\u0300-\u036f]/gi, ""),
      a
    );
    if (similarity >= higherSimilarity) {
      higherSimilarity = similarity;
      similars.unshift(a);
    }
    if (a.length === wordToBeHighlighted.length) {
      return a.substr(1) + b;
    }
    return a + b;
  });
  // Get final and init position for the underline terms
  return getPositions(trimmedText, similars[1]);
};

const getPositions = (trimmedText, pattern) => {
  const termsLength = [];
  trimmedText.replace(pattern, item => {
    const regexExec = trimmedText.match(item);
    termsLength.push({
      initPosition: regexExec.index,
      finalPosition: regexExec.index + item.length
    });
    return item;
  });
  return termsLength;
};

module.exports = {
  fuzzy,
  stringManipulation
};
