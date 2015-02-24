/*global babel, window */
import eval2 from 'eval2';

let timeouts = [], intervals = [];

export default function run ( code, globals = {} ) {
	let transpiled = babel( code ).code;

	clearAllTimeoutsAndIntervals();

	globals.setTimeout = _setTimeout;
	globals.setInterval = _setInterval;

	let globalKeys = Object.keys( globals );

	let fn = new eval2.Function( globalKeys, transpiled );
	fn.apply( window, globalKeys.map( k => globals[k] ) );
}

function _setTimeout ( fn, delay ) {
	let timeout = setTimeout( fn, delay || 0 );
	timeouts.push( timeout );

	return timeout;
}

function _setInterval ( fn, delay ) {
	let interval = setInterval( fn, delay || 0 );
	intervals.push( interval );

	return interval;
}

function _clearTimeout ( t ) {
	clearTimeout( t );
}

function _clearInterval ( i ) {
	clearInterval( i );
}

function clearAllTimeoutsAndIntervals () {
	timeouts.forEach( _clearTimeout );
	intervals.forEach( _clearInterval );

	timeouts = [];
	intervals = [];
}