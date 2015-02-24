export default [
	`var clock = new Ractive({
	el: demo,
	template,
	data: {
		minor: new Array( 60 ),
		major: new Array( 12 ),
		datetime: new Date()
	}
});

var interval = setInterval( () => {
	clock.set( 'datetime', new Date() );
}, 1000 );`,

	`var Clock = Ractive.extend({
	template,
	css, // <-- this is encapsulated!
	data: {
		minor: new Array( 60 ),
		major: new Array( 12 )
	}
});

var clock = new Clock({
	el: demo,
	data: {
		datetime: new Date()
	}
});`
];