export default [
	`<div on-mousemove='redraw(event)'>
	<svg>
		<circle class='eye' cx='100' cy='100' r='96'/>
		<circle
			class='pupil'
			cx='{{100+(x-100)/10}}'
			cy='{{100+(y-100)/10}}'
			r='15'
		/>

		<circle class='eye' cx='300' cy='100' r='96'/>
		<circle
			class='pupil'
			cx='{{300+(x-300)/10}}'
			cy='{{100+(y-100)/10}}'
			r='15'
		/>
	</svg>
</div>`,

	`<div on-mousemove='redraw(event)'>
	<svg>
		<circle class='eye' cx='100' cy='100' r='96'/>
		<circle
			class='pupil'
			cx='{{100+(x-100)/10}}'
			cy='{{100+(y-100)/10}}'
			r='15'
		/>

		<circle class='eye' cx='300' cy='100' r='96'/>
		<circle
			class='pupil'
			cx='{{300+(x-300)/10}}'
			cy='{{100+(y-100)/10}}'
			r='15'
		/>

		<path class='eyebrow' d='M0,10 C50,-40 100,-40 150,-20'/>
		<path class='eyebrow' d='M250,-30 C300,-40 350,-40 400,10'/>
	</svg>
</div>`
];
