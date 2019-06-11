const stringManipulation = (trimmedText, wordToBeHighlighted) => {
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
  return termsLength;
};

const fuzzy = (trimmedText, wordToBeHighlighted) => {
  const stringSimilarity = require("string-similarity");
  let similarity;
  let higherSimilarity = 0.00000001;
  const similars = [];
  const termsLength = [];
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
  trimmedText = trimmedText.replace(similars[1], item => {
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
