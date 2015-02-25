export default `<link rel='ractive' href='../star.html'>

<div class='final-score'>
	<div class='stars'>
		{{#each stars}}
			<star lit='{{displayedScore >= this}}'/>
		{{/each}}
	</div>

	<p>
		<strong>{{Math.round(displayedScore)}}</strong>

		{{#if showShareButton}}
			<a
				class='twitter-shared'
				href='[[webIntent]]'
				target='_blank'
				intro='slide'
			>Share your score</a>
			<span class='tweet'></span>
		{{/if}}
	</p>
</div>

<style>
	.stars {
		width: 100%;
		max-width: 20em;
		margin: 0 auto 1em auto;
	}

	.stars::after {
		content: '';
		display: table;
		clear: both;
	}

	strong {
		font-weight: 900;
		font-size: 3em;
	}

	.twitter-shared {
		text-decoration: none;
		color: #005689;
		display: block;
	}

	.tweet {
		background-image: url('http://interactive.guim.co.uk/embed/2015/02/oscars/assets/front-page-assets/Twitter_logo_blue.png');
		background-repeat: no-repeat;
		background-size: 100%;
		width: 18px;
		height: 15px;
		display: inline-block;
		margin-left: -5px;
		margin: 0 5px 0 5px;
	}
</style>

<script>
	const URL = encodeURIComponent( 'http://www.theguardian.com/film/ng-interactive/2015/feb/19/oscars-2015-nominees-movies-quiz' );

	component.exports = {
		data: {
			displayedScore: 0,
			title: ''
		},

		computed: {
			webIntent () {
				var score = this.get( 'score' );
				var title = this.get( 'title' );

				var text = encodeURIComponent( \u0060\u0024{title}: I scored \u0024{score} on the @GuardianUS super-hard Oscars quiz: \u0060 );

				return \u0060https://twitter.com/intent/tweet?text=\u0024{text}&url=\u0024{URL}&hashtags=oscars\u0060;
			}
		},

		oninit () {
			setTimeout( () => {
				this.animate( 'displayedScore', this.get( 'score' ), {
					duration: this.get( 'score' ) * 40,
					easing: 'linear'
				}).then( () => {
					this.set( 'showShareButton', true );
				});
			});
		},

		transitions: {
			fade: require( 'ractive-transitions-fade' ),
			slide: require( 'ractive-transitions-slide' )
		}
	};
</script>`;
