var supported, cache = {};

try {
	let random = Math.random();
	let key = `__TEST__${random}`;
	window.localStorage.setItem( key, '42' );
	supported = window.localStorage.getItem( key ) === '42';
	window.localStorage.removeItem( key );
} catch ( err ) {
	supported = false;
}

var storage = {
	supported,

	set ( key, value ) {
		if ( !supported ) return;
		cache[ key ] = value;
		window.localStorage.setItem( key, JSON.stringify( value ) );
	},

	get ( key ) {
		if ( !supported ) return;

		if ( !cache.hasOwnProperty( key ) ) {
			let value = window.localStorage.getItem( key );

			try {
				value = JSON.parse( value );
				cache[ key ] = value;
			} catch ( err ) {}
		}

		return cache[ key ];
	},

	remove ( key ) {
		if ( !supported ) return;
		delete cache[ key ];
		window.localStorage.removeItem( key );
	}
};

export default storage;