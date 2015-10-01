var path    = require('path');
var postcss = require('postcss');
var expect  = require('chai').expect;
var fs      = require('fs');

var plugin = require('../');

function test(name, opts, done) {
	var fixtureDir = './test/fixtures/';
	var baseName   = name.split(':')[0];
	var testName   = name.split(':').join('.');
	var inputPath  = path.resolve(fixtureDir + baseName + '.css');
	// var actualPath = path.resolve(fixtureDir + testName + '.actual.css');
	var expectPath = path.resolve(fixtureDir + testName + '.expect.css');

	var inputCSS  = fs.readFileSync(inputPath, 'utf8');
	var expectCSS = fs.readFileSync(expectPath, 'utf8');

	postcss([plugin(opts)]).process(inputCSS, {
		from: inputPath
	}).then(function (result) {
		var actualCSS = result.css;

		// fs.writeFileSync(actualPath, actualCSS);

		expect(actualCSS).to.eql(expectCSS);
		expect(result.warnings()).to.be.empty;

		done();
	}).catch(function (error) {
		done(error);
	});
}

describe('postcss-short-border', function () {
	it('supports normal shorthands', function (done) {
		test('basic', {}, done);
	});

	it('ignores prefixed shorthands', function (done) {
		test('prefix', {}, done);
	});

	it('ignores normal shorthands when a prefix is specified', function (done) {
		test('basic:w-prefix', { prefix: 'x' }, done);
	});

	it('supports prefixed shorthands when a prefix is specified', function (done) {
		test('prefix:w-prefix', { prefix: 'x' }, done);
	});

	it('ignores shorthands that do not need to be altered', function (done) {
		test('unalter', {}, done);
	});
});
