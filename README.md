# landsoul

A classless CSS library (IE11 is not supported)

Preview: <https://yieldray.github.io/landsoul/>

# Usage

To enable dark mode, use `prefers-color-scheme: dark` or `body[data-theme="dark"]`

```html
<link rel="stylesheet" href="https://unpkg.com/landsoul" />

<!-- add this to enable dark mode manually -->
<body data-theme="dark"></body>
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

```bash
$ npm install
$ npm run dev
# xdg-open index.html
```

## build

```bash
$ npm run build
```
