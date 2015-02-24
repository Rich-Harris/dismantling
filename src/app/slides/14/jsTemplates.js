let jsTemplates = [
	`var ractive = new Ractive({
	el: demo,
	template,
	data: {
		name: 'Applicative',
		datetime: new Date()
	}
});

var interval = setInterval( () => {
	ractive.set( 'datetime', new Date() );
}, 1000 );`,

	`var ractive = new Ractive({
	el: demo,
	template,
	data: {
		name: 'Applicative',
		datetime: new Date()
	}
});

var interval = setInterval( () => {
	ractive.set( 'datetime', moment( new Date() ).format( 'MMMM Do YYYY h:mm:ss a' ) );
}, 1000 );`,

	`var ractive = new Ractive({
	el: demo,
	template,
	data: {
		name: 'Applicative',
		datetime: new Date(),
		moment
	}
});

var interval = setInterval( () => {
	ractive.set( 'datetime', new Date() );
}, 1000 );`
];

export default jsTemplates;