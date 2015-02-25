let jsTemplates = [
	`var ractive = new Ractive({
	el: demo,
	template,
	data: {
		name: 'Applicative',
		datetime: new Date(),
		moment: moment
	},
	components: { Clock }
});

var interval = setInterval( () => {
	ractive.set( 'datetime', new Date() );
}, 1000 );`
];

export default jsTemplates;
