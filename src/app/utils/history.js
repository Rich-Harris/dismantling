var history;

if ( window.history && typeof window.history.pushState === 'function' && typeof window.history.replaceState === 'function' ) {
	history = {
		push ( state ) {
			window.history.pushState( state, 'x' );
		},

		replace ( state ) {
			window.history.replaceState( state, 'x' );
		},

		back () {
			window.history.back();
		},

		onstate ( cb ) {
			window.addEventListener( 'popstate', e => cb( e.state ), false );
		}
	};
}

else {
	let stack = [ null ];
	let callbacks = [];
	let index = 0;

	history = {
		push ( state ) {
			index += 1;
			this.replace( state );
		},

		replace ( state ) {
			stack[ index ] = state;
			stack.length = index + 1;
		},

		back () {
			index -= 1;
			callbacks.forEach( cb => {
				cb( stack[ index ] );
			});
		},

		onstate ( cb ) {
			callbacks.push( cb );
		}
	};
}

export default history;
