// tooling
const postcss = require('postcss');

// border properties
const properties = ['width', 'style', 'color'];

// border sides
const sides = ['top', 'right', 'bottom', 'left'];

// plugin
module.exports = postcss.plugin('postcss-short-border', ({
	prefix = '',
	skip   = '*'
}) => {
	// dashed prefix
	const dashedPrefix = prefix ? '-' + prefix + '-' : '';

	// property pattern
	const propertyMatch = new RegExp(`^${ dashedPrefix }(border(?:-(color|style|width))?)$`);

	// process a matched declaration
	const processMatchedDeclaration = (decl) => {
		// unprefixed property
		const property = decl.prop.match(propertyMatch)[1];

		// inner-property (color, style, width)
		const innerProperty = decl.prop.match(propertyMatch)[2];

		// if a prefix is in use
		if (prefix) {
			// remove it from the property
			decl.prop = property;
		}

		// if a border has an inner-property
		if (innerProperty) {
			// spaced-separated values (top, right, bottom, left)
			const values = postcss.list.space(decl.value);

			// if the values contain a skip token
			if (values.indexOf(skip) !== -1) {
				// conditionally add a right value
				if (values.length === 1) {
					values.push(values[0]);
				}

				// conditionally add a bottom value
				if (values.length === 2) {
					values.push(values[0]);
				}

				// conditionally add a left value
				if (values.length === 3) {
					values.push(values[1]);
				}

				// for each value
				values.forEach((value, index) => {
					// if the value is not a skip token
					if (value !== skip) {
						// create a new declaration for the border side inner-property
						decl.cloneBefore({
							prop: `border-${ sides[index] }-${ innerProperty }`,
							value: value
						});
					}
				});

				// remove the original declaration
				decl.remove();
			}
		} else if (postcss.list.split(decl.value, '/').length > 1) {
			// for each of the border values
			postcss.list.split(decl.value, '/').forEach((values, index) => {
				// process the new declaration for the border inner-property
				processMatchedDeclaration(decl.cloneBefore({
					prop: `${ dashedPrefix }border-${ properties[index] }`,
					value: values
				}));
			});

			// remove the original declaration
			decl.remove();
		}
	};

	return (css) => {
		// walk each matching declaration
		css.walkDecls(propertyMatch, processMatchedDeclaration);
	};
});

