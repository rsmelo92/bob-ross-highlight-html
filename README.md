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

Returns the html with `<mark>` tags on desired word

```javascript
import { highlightTerm } from "bob-ross-highlight-html";

// result: '<p>Highlight this, which is a small <mark>html</mark>, but also highlights big <mark>html</mark></p>'
highlightTerm(
  "<p>Highlight this, which is a small html, but also highlights big htmls</p>",
  "html"
);
```
