export default {
	on ( event, callback ) {
		this.eventCallbacks( event ).push( callback );

		return {
			cancel: () => {
				this.off( event, callback );
			}
		};
	},

	off ( event, callback ) {
		var callbacks, i;

		callbacks = this.eventCallbacks( event );

		i = callbacks.length;
		while ( i-- ) {
			if ( callbacks[i] === callback ) {
				callbacks.splice( i, 1 );
			}
		}
	},

	fire ( event, ...args ) {
		var callbacks, len, i;

		callbacks = this.eventCallbacks( event );
		len = callbacks.length;

		for ( i = 0; i < len; i += 1 ) {
			callbacks[i].apply( this, args );
		}
	},

	eventCallbacks: function ( event ) {
		var callbacks = this._callbacks || ( this._callbacks = {} );
		return callbacks[ event ] || ( callbacks[ event ] = [] );
	}
};
