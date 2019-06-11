# Bob Ross Highlight HTML

A package to highlight html. Based on Bob Ross powers.

![image](https://user-images.githubusercontent.com/16295402/58977758-ba340800-87a0-11e9-996b-78275c7cf567.png)

> “Wash the brush, just beats the devil out of it ”
> ― Bob Ross, The Joy of Painting with Bob Ross, Vol. 29

### Install:

```
yarn add bob-ross-highlight-html
```

### Run tests

```
yarn test
```

### highlightTerm()

Returns the html with `<mark>` tags on desired term

```javascript
import { highlightTerm } from "bob-ross-highlight-html";

// Method signature
highlightTerm(
  htmlToBeScanned: String ,
  termToBeHighlighted: String ,
  shouldUseFallback: Boolean
);

// Pass a text to be scanned and a term to be highlighted
// It returns: '<p>Highlight this, which is a <mark>small</mark> text</p>'
highlightTerm(
  "<p>Highlight this, which is a small text</p>",
  "small"
);

// If it fails to find exact word a fuzzy search fallback will be attempt and an approximate result will be marked
// It fails then returns: '<p>Highlight this, which is a<mark> small t</mark>ext</p>'
highlightTerm(
  "<p>Highlight this, which is a small text</p>",
  "small this"
);

// If you don't want to use fallback for fail attempts pass a false as third argument
// It fails then returns: '<p>Highlight this, which is a small text</p>'
highlightTerm(
  "<p>Highlight this, which is a small text</p>",
  "small this",
  false
);
```
