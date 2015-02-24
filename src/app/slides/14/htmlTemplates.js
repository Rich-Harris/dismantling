let htmlTemplates = [
	`<h1>Hello {{name}}!</h1>
<p>It's <strong>{{datetime}}</strong>.</p>`,

	`<h1>Hello {{name}}!</h1>
<p>It's <strong>{{moment(datetime).format('MMMM Do YYYY h:mm:ss a')}}</strong>.</p>`,

	`<h1>Hello {{name}}!</h1>
<p>
  Today is {{moment(datetime).format('MMMM Do YYYY')}}.
  The time is <strong>{{moment(datetime).format('h:mm:ss a')}}</strong>.
</p>`
];

export default htmlTemplates;