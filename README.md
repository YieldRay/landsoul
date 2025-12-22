# landsoul

[![](https://badgen.net/packagephobia/install/landsoul)](https://packagephobia.com/result?p=landsoul)
[![](https://img.shields.io/npm/v/landsoul)](https://www.npmjs.com/package/landsoul)

A [classless](https://github.com/dbohdan/classless-css) CSS library.

> i.e. Style applied to HTML tags directly.

Docs: <https://yieldray.github.io/landsoul/>

# Usage

```html
<link rel="stylesheet" href="https://unpkg.com/landsoul" />
```

Alternatively, you can use CSS [@layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) to easily override landsoul styles.

```css
/* Remember that the @import at-rule must precede all other types of rules, except @charset and @layer rules. */
@layer landsoul, my-layer;
@import url(//unpkg.com/landsoul) layer(landsoul);
/* Your style here... */
```

## CSS reset

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

## Dark mode

To enable dark mode, use `:root[data-theme="dark"]`

```html
<!-- Add this to enable dark mode manually -->
<html data-theme="dark"></html>
```

Or if you target to Chrome>=123, you can use `color-scheme`

```css
:root {
    color-scheme: dark;
}
```

## Extra

[`Landsoul Extra`](https://yieldray.github.io/landsoul/extra.html) is an extra stylesheet file that extends Landsoul with additional utility styles and components through extra class names.

```html
<link rel="stylesheet" href="https://unpkg.com/landsoul/dist/extra.css" />
<!-- OR -->
<style>
    @import url(//unpkg.com/landsoul/dist/extra) layer(landsoul);
</style>
```

Unlike other frameworks, `Landsoul Extra` is not intended to be a full framework requiring multiple class names to style a single component.

Instead, it relies on modern CSS features, and each component requires only a single class name.

# dev

Use Node.js LTS version.

```bash
$ npm install
$ npm run dev
```

# build

```bash
$ npm run build
```
