export default [
	`<svg viewBox='0 0 100 100'>
	<g transform='translate(50,50)'>
		<circle stroke='#333' fill='white' r='48'/>

		<!-- markers every minute (major markers every 5 minutes) -->
		<g>
			{{#each minor :i}}
				<line class='minor' y1='42' y2='45' transform='rotate( {{
					360 * i / minor.length
				}} )'/>
			{{/each}}
		</g>

		<g>
			{{#each major :i}}
				<line class='major' y1='35' y2='45' transform='rotate( {{
					360 * i / major.length
				}} )'/>
			{{/each}}
		</g>

		<!-- hour hand -->
		<line class='hour' y1='2' y2='-20' transform='rotate( {{
			30 * datetime.getHours() +
			datetime.getMinutes() / 2
		}} )'/>

		<!-- minute hand -->
		<line class='minute' y1='4' y2='-30' transform='rotate( {{
			6 * datetime.getMinutes() +
			datetime.getSeconds() / 10
		}} )'/>

		<!-- second hand -->
		<g transform='rotate( {{
			6 * datetime.getSeconds()
		}} )'>
			<line class='second' y1='10' y2='-38'/>
			<line class='second-counterweight' y1='10' y2='2'/>
		</g>
	</g>
</svg>`
];