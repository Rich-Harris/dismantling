const MASTER_TEMPLATE = `var ractive = new Ractive({
	el: demo,
	template: '<h1>Hello {{name}}!</h1>',
	data: {
		name: 'world'
	}
});/* BREAK */


ractive.set( 'name', 'everybody' );/* BREAK */


var h1 = demo.querySelector( 'h1' );
h1.style.color = 'red';
h1.style.fontFamily = 'Comic Sans MS';/* BREAK */


ractive.set( 'name', 'Applicative' );/* BREAK */


ractive.resetTemplate(
	"<p>Hello {{name}}!</p>"
);/* BREAK */


ractive.resetTemplate(
	"<p>Hello {{name}}!</p><p>It's nice to meet you, {{name}}.</p>"
);
`;

let templates = [ `var ractive = new Ractive({
	el: demo,
	template: '<h1>Hello world!</h1>'
});` ];

// add all the other steps
let steps = MASTER_TEMPLATE.split( /\/\*\s*BREAK\s*\*\/\n?/ );

steps.forEach( ( s, i ) => {
	templates.push( steps.slice( 0, i + 1 ).join( '' ) );
});

export default templates;