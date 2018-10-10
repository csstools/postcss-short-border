# PostCSS Short Border [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS Short Border] lets you omit sides within `border-` properties in CSS.
It also lets you fully define individual values on the `border` property using
dividers (`/`).

```pcss
.example-1 {
  border-color: blue blue *;
}

.example-2 {
  border-width: 1px *;
}

.example-3 {
  border: 1px 2px / solid / red orange;
}

/* becomes */

.example-1 {
  border-top-color: blue;
  border-right-color: blue;
  border-left-color: blue;
}

.example-2 {
  border-top-width: 1px;
  border-bottom-width: 1px;
}

.example-3 {
  border-width: 1px 2px;
  border-style: solid;
  border-color: red orange;
}
```

## Usage

Add [PostCSS Short Border] to your project:

```bash
npm install postcss-short-border --save-dev
```

Use [PostCSS Short Border] to process your CSS:

```js
const postcssShortBorder = require('postcss-short-border');

postcssShortBorder.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require('postcss');
const postcssShortBorder = require('postcss-short-border');

postcss([
  postcssShortBorder(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

[PostCSS Short Border] runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [PostCSS CLI](INSTALL.md#postcss-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |

## Options

#### prefix

The `prefix` option defines a prefix required by properties being transformed.
Wrapping dashes are automatically applied, so that `x` would transform
`-x-border`.

```js
postcssShortBorder({ prefix: 'x' });
```

```pcss
.example-1 {
  -x-border-color: blue blue *;
}

/* becomes */

.example-1 {
  border-top-color: blue;
  border-right-color: blue;
  border-left-color: blue;
}
```

#### skip

The `skip` option defines the skip token used to ignore portions of the
shorthand.

```js
postcssShortBorder({ skip: '-' });
```

```pcss
.example-1 {
  border-color: blue blue -;
}

/* becomes */

.example-1 {
  border-top-color: blue;
  border-right-color: blue;
  border-left-color: blue;
}
```

[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-short-border.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-short-border
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-short-border.svg
[npm-url]: https://www.npmjs.com/package/postcss-short-border

[PostCSS]: https://github.com/postcss/postcss
[PostCSS Short Border]: https://github.com/jonathantneal/postcss-short-border
