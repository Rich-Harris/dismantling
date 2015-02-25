export default {
	easeOutElastic ( t ) {
		var s = 2;
		var p = 0.3;
		var a = 1;

		if ( t === 0 ) return 0;
		if ( t === 1 ) return 1;

		s = p / ( 2 * Math.PI ) * Math.asin( 1 );

		return a * Math.pow( 2, -10 * t ) * Math.sin( ( t * 1 - s ) * ( 2 * Math.PI ) / p ) + 1;
	}
};