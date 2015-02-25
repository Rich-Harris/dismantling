let htmlTemplates = [
	`<h1>Hello {{name}}!</h1>
<p>
  Today is {{moment(datetime).format('MMMM Do YYYY')}}.
  The time is <strong>{{moment(datetime).format('h:mm:ss a')}}</strong>.
</p>

<Clock datetime='{{datetime}}'/>`
];

export default htmlTemplates;
