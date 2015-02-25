export default `ractive.on({
	start () {
		ractive.set( 'step', 1 )
		.then( () => ractive.set( 'step', 2 ) )
		.then( () => ractive.set( 'step', 3 ) );
	},

	reset () {
		ractive.set( 'step', 0 )
	}
});`;