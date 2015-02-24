export default function fadeAndDispose ( t ) {
	t.animateStyle({
		opacity: 0
	}, {
		duration: 400,
		easing: 'ease-out'
	}).then( () => {
		t.node.src = '';
		t.complete();
	});
}
