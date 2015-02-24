export default function loadAndFade ( t ) {
	t.setStyle({
		opacity: 0
	});

	t.node.addEventListener( 'canplaythrough', () => {
		t.animateStyle({
			opacity: 1
		}, {
			duration: 400,
			easing: 'ease-out'
		}).then( t.complete );
	});

	t.node.play();
}
