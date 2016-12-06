# Border Shorthand <a href="https://github.com/postcss/postcss"><img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right"></a>

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Licensing][lic-image]][lic-url]
[![Changelog][log-image]][log-url]
[![Gitter Chat][git-image]][git-url]

[Border Shorthand] lets you omit sides within `border-` properties in CSS. It also lets you fully define individual values on the `border` property using dividers (`/`).

```css
/* before */

.example-1 {
	border-color: blue blue *;
}

.example-2 {
    border-width: 1px *;
}

.example-3 {
    border: 1px 2px / solid / red orange;
}

/* after */

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

## Options

#### `prefix`

Type: `String`  
Default: `""`

Adds an optional prefix to the `border` property (e.g. `"x"` for `-x-border`). Wrapping dashes (`-`) are automatically applied.

#### `skip`

Type: `String`  
Default: `"*"`

Specifies the skip token used to disregard a value.

## Usage

Add [Border Shorthand] to your build tool:

```bash
npm install postcss-short-border --save-dev
```

#### Node

```js
require('postcss-short-border').process(YOUR_CSS, { /* options */ });
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Border Shorthand] as a PostCSS plugin:

```js
postcss([
	require('postcss-short-border')({ /* options */ })
]).process(YOUR_CSS, /* options */);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Border Shorthand] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
	return gulp.src('./src/*.css').pipe(
		postcss([
			require('postcss-short-border')({ /* options */ })
		])
	).pipe(
		gulp.dest('.')
	);
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [Border Shorthand] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			use: [
				require('postcss-short-border')({ /* options */ })
			]
		},
		dist: {
			src: '*.css'
		}
	}
});
```

[npm-url]: https://www.npmjs.com/package/postcss-short-border
[npm-img]: https://img.shields.io/npm/v/postcss-short-border.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-short-border
[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-short-border.svg
[lic-url]: LICENSE.md
[lic-image]: https://img.shields.io/npm/l/postcss-short-border.svg
[log-url]: CHANGELOG.md
[log-image]: https://img.shields.io/badge/changelog-md-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[git-image]: https://img.shields.io/badge/chat-gitter-blue.svg

[Border Shorthand]: https://github.com/jonathantneal/postcss-short-border
[PostCSS]: https://github.com/postcss/postcss
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[1-to-4 syntax]: https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Tricky_edge_cases
