const { highlightTerm } = require("../");

describe("stringPrefixSufix", () => {
  const text =
    "<p>Testing this lib is really easy, all you have to do is google it on Google enterprise LTDA and you will find</p>";

  it("should add <mark> to text with string manipulation", () => {
    const term = "Google Enterprise LTDA";
    const hightlightedText = highlightTerm(text, term);
    expect(hightlightedText).toBe(
      "<p>Testing this lib is really easy, all you have to do is google it on <mark>Google enterprise LTDA</mark> and you will find</p>"
    );
  });

  it("should add <mark> to text with fallback fuzzy", () => {
    const term = "Google Enterprise LTDA ME";
    const hightlightedText = highlightTerm(text, term);
    expect(hightlightedText).toBe(
      "<p>Testing this lib is really easy, all you have to do is google it on <mark>Google enterprise LTDA an</mark>d you will find</p>"
    );
  });

  it("should not use fallback fuzzy and ignore <mark> if first attempt fail", () => {
    const term = "Google Enterprise LTDA ME";
    const hightlightedText = highlightTerm(text, term, false);
    expect(hightlightedText).toBe(
      "<p>Testing this lib is really easy, all you have to do is google it on Google enterprise LTDA and you will find</p>"
    );
  });

  it("should add <mark> to text when has more than one term", () => {
    let text =
      "<p>Testing this lib is really easy, all you have to do is google it on Google enterprise LTDA and you will find</p>";
    const terms = ["Google Enterprise LTDA ME", "google", "Testingthislib"];
    terms.forEach(term => {
      text = highlightTerm(text, term, true);
    });
    expect(text).toBe(
      "<p><mark>Testing this lib</mark> is really easy, all you have to do is <mark>google</mark> it on <mark>Google enterprise LTDA an</mark>d you will find</p>"
    );
  });
});
