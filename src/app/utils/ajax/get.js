import Promise from 'utils/core/promise';

var XMLHttpRequest = window.XMLHttpRequest,
	XDomainRequest = window.XDomainRequest;

export default function get ( url, options = {} ) {
	return new Promise( function ( fulfil, reject ) {
		var xdr, xhr;

		if ( XDomainRequest ) {
			xdr = new XDomainRequest();
			xdr.onerror = reject;
			xdr.ontimeout = function () {};
			xdr.onprogress = function () {};
			xdr.onload = function() {
				fulfil( xdr.responseText );
			};
			xdr.timeout = 5000;
			xdr.open( 'get', url );
			xdr.send();
		}

		else {
			xhr = new XMLHttpRequest();

			xhr.open( 'GET', url );

			if ( options.responseType ) {
				xhr.responseType = options.responseType;
			}

			xhr.onload = function () {
				fulfil( options.responseType ? xhr.response : xhr.responseText );
			};

			xhr.onerror = reject;

			xhr.send();
		}
	});
}
