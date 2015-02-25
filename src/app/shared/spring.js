import tween from 'utils/animate/tween';

function easeOutElastic ( t ) {
	var p = 0.4;
	var a = 1;

	if ( t === 0 ) return 0;
	if ( t === 1 ) return 1;

	var s = p / ( 2 * Math.PI ) * Math.asin( 1 );

	return a * Math.pow( 2, -10 * t ) * Math.sin( ( t * 1 - s ) * ( 2 * Math.PI ) / p ) + 1;
}

export default function spring ( t, params ) {
	params = t.processParams( params, {
		duration: 2000,
		delay: 0
	});

	let initialTransform = t.getStyle( 'transform' );

	if ( initialTransform === 'none' ) {
		initialTransform = '';
	}

	t.setStyle({
		transform: `${initialTransform} scale(0)`
	});

	tween( 0, 1, {
		step ( val ) {
			let eased = easeOutElastic( val );
			t.setStyle( 'transform', `${initialTransform} scale(${eased})` );
		},
		duration: params.duration,
		delay: params.delay
	}).then( () => {
		t.setStyle( 'transform', initialTransform );
		t.complete();
	});
}