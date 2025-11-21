# landsoul

[![](https://badgen.net/packagephobia/install/landsoul)](https://packagephobia.com/result?p=landsoul)
[![](https://img.shields.io/npm/v/landsoul)](https://www.npmjs.com/package/landsoul)

A classless CSS library (IE11 is not supported).

> i.e. Style applied to HTML tags directly.

Preview: <https://yieldray.github.io/landsoul/>

# Usage

To enable dark mode, use `body[data-theme="dark"]`

```html
<link rel="stylesheet" href="https://unpkg.com/landsoul" />

<!-- add this to enable dark mode manually -->
<body data-theme="dark"></body>
```

Or if you target to Chrome>=123, you can use `color-scheme`

```css
:root {
    color-scheme: dark;
}
```

Use with CSS [@layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer), this allows landsoul styles to be easily overridden.

```css
/* remember that the @import at-rule must precede all other types of rules, except @charset and @layer rules. */
@layer landsoul, my-layer;
@import url(//unpkg.com/landsoul) layer(landsoul);
/* your style here... */
```

This stylesheet DO NOT include css reset, and keep minimum influence to the built-in html elements,  
so you may add some extra css to make things work.

```css
/* For example: */
body {
    box-sizing: border-box;
    max-width: 38rem;
    margin: 0 auto;
    padding: 1rem;
}

img {
    display: inline-block;
    max-width: 100%;
}
```

## dev

Use Node.js LTS version.

```bash
$ npm install
$ npm run dev
```

## build

```bash
$ npm run build
```
