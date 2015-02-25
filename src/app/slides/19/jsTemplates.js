export default [
	`var ractive = new Ractive({
	el: demo,
	template,
	data: { x: 200, y: 100 },
	redraw ( event ) {
		let {
			left,
			top
		} = this.find( 'svg' ).getBoundingClientRect();

		this.set({
			x: event.original.clientX - left,
			y: event.original.clientY - top
		});
	}
});`
];
