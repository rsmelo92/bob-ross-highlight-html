const highlightTerm = (text, wordToBeHighlighted) => {
  let trimmedText = text
    .replace(/(<([^>]+)>)/gi, item =>
      item
        .split("")
        .map(() => "_")
        .join("")
    )
    .replace(/[^A-Z0-9]/gi, "_")
    .toLowerCase();
  let regex = wordToBeHighlighted
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
  if (!termsLength.length > 0) {
    const stringSimilarity = require("string-similarity");
    let similarity,
      higherSimilarity = 0.00000001,
      finalIndex,
      crazey = [];
    trimmedText.split("").reduce(function(a, b, index) {
      similarity = stringSimilarity.compareTwoStrings(
        wordToBeHighlighted.normalize("NFD").replace(/[\u0300-\u036f]/gi, ""),
        a
      );
      if (similarity >= higherSimilarity) {
        higherSimilarity = similarity;
        crazey.unshift(a);
      }
      if (a.length === wordToBeHighlighted.length) {
        a = a.substr(1);
      }
      return a + b;
    });
    trimmedText = trimmedText.replace(crazey[1], item => {
      const regexExec = trimmedText.match(item);
      termsLength.push({
        initPosition: regexExec.index,
        finalPosition: regexExec.index + item.length
      });
      return item;
    });
  }
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

  console.log("=====> final", text);

  return text;
};

highlightTerm(
  `10/06/2019
Terceira Vice-presidência

Cartório da 12ª Câmara Cível - Unidade Afonso

Convocação de Câmara

DÉCIMA SEGUNDA CÂMARA CÍVEL - Ordem do dia para julgamento - Sessão de Julgamento a realizar-se no dia 19/06/2019, QUARTA-FEIRA, às 13h30min, no plenário VIII da Unidade Afonso Pena. Cartório da Décima Segunda Câmara Cível. Escrivã: Grazziane Vargas Leonel de Carvalho.

Apelação Cível


02437 - 5005789-20.2016.8.13.0672 @ (Processo Eletrônico) Sete Lagoas;

Apelante(s) - GUSTAVO GONCALVES TORRES DA CRUZ; Apelado(a)(s) - GOOGLE BRASIL INTERNET LTDA; GOSHME SOLUCOES PARA INTERNET LTDA - JUSBRASIL; Relator - Des(a). José Flávio de Almeida; Autos incluídos na pauta de julgamento de 19/06/2019, às 13:30 horas Adv -FABIO RIVELLI, MÁRIO PINTO RODRIGUES DA COSTA FILHO, THIAGO ROCHESTER AVILA.`,
  "GOOGLE BRASIL INTERNET LTDA"
  // "Goshme Soluções para internet ltda me"
);

module.exports = {
  highlightTerm
};
