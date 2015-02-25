import Promise from 'utils/core/promise';

export default function loadAudio ( sources ) {
	return new Promise( ( fulfil, reject ) => {
		let audio = new Audio();

		if ( !audio.canPlayType ) {
			reject( 'Audio does not appear to be supported' );
		}

		audio.onerror = e => {
			console.warn( 'error loading audio', sources );
			reject( e );
		};

		audio.addEventListener( 'canplaythrough', () => {
			audio.pause();
			fulfil( audio );
		});

		if ( sources.mp3 && ( audio.canPlayType( 'audio/mpeg' ) !== '' ) ) {
			audio.setAttribute( 'src', sources.mp3 );
		} else if ( sources.ogg && ( audio.canPlayType( 'audio/ogg; codecs="vorbis"' ) !== '' ) ) {
			audio.setAttribute( 'src', sources.ogg );
		}

		else {
			reject( 'No valid sources found' );
		}


		// trigger loading
		// audio.play();
	});
}