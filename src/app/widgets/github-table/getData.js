const USE_LOCAL = true;

const json = response => response.json();

let getData;

if ( USE_LOCAL ) {
	getData = () => fetch( '/repos.json' ).then( json ).then( repos => repos.map( repo => {
		repo.lastCommit = new Date( repo.lastCommit );
		return repo;
	}));
} else {
	let repos = [
		'ractivejs/ractive',
		'raynos/mercury',
		'omcljs/om',
		'inductor-labs/hamlet',
		'yyx990803/vue',
		'lhorie/mithril',
		'angular/angular.js',
		'facebook/react',
		'emberjs/ember.js',
		'meteor/meteor'
	];

	getData = () => {
		var promises = repos.map( repo => {
			return fetch( `https://api.github.com/repos/${repo}` ).then( json ).then( data => {
				let { name, stargazers_count } = data;

				return Promise.all([
					fetch( `${data.contributors_url}?per_page=100` ).then( json ).then( contributors => contributors.length ),
					fetch( data.commits_url.replace( '{/sha}', '' ) ).then( json ).then( commits => {
						return fetch( commits[0].url ).then( json ).then( commit => {
							return new Date( commit.commit.author.date );
						});
					})
				]).then( ([ contributors, lastCommit ]) => {
					return { name, stargazers_count, contributors, lastCommit };
				});
			});
		});

		return Promise.all( promises );
	};
}

export default getData;
