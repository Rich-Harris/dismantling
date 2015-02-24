var gobble = require( 'gobble' );

module.exports = gobble([

	gobble( 'src/root' ),

	gobble( 'src/app' )
		.transform( 'ractive', {
			type: 'es6'
		})
		.transform( 'babel', {
			blacklist: [ 'es6.modules', 'useStrict' ]
		})
		.transform( 'esperanto-bundle', {
			entry: 'index',
			dest: 'app',
			type: 'cjs'
		})
		.transform( 'derequire' )
		.transform( 'browserify', {
			entries: [ './app' ],
			dest: 'app.js',
			standalone: 'App',
			debug: true
		})
		.transform( 'sorcery' ),

	gobble( 'src/styles' ).transform( 'sass', {
		src: 'main.scss',
		dest: 'main.css'
	})

]);
