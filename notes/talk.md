# Dismantling the barriers to entry

This isn't a talk about social barriers to entry - gender imbalance, ageism, hiring practices that revolve around 'cultural fit', or any of the myriad other problems that afflict the tech industry. Those are real issues that diminish us all, but they're not issues on which I have any unique insight.

Instead, I want to talk about the barrier you face after you've crossed that first one: that programming is too damn hard. My goal here is to convince you that it doesn't need to be that way, and that those of us here in this room have a role to play in making it easier for the next generation of programmers to express their ideas through code.

Now, there's a certain genre of tech conference talk that you're probably familiar with - a speaker, rather like me, stands in front of an audience, rather like you, and speaks in generalities about a nebulous proposition, such as that programming is 'too damn hard', perhaps with some code samples and animated GIFs, before mentioning, about half way through - almost as an afterthough - that they've been working on a library or tool that's designed to address the problem at hand. And then the rest of the talk is basically a sales pitch.

But this isn't that kind of talk.

---

Instead, I'm going to do the sales pitch first and then get on with the nebulous pontificating. The thing I'm selling is Ractive.js, which is a UI library designed to drastically simplify the creation of rich interactive web applications. I'm going to show you what it can do, and then I'm going to talk a little bit about how it works, but first I need to talk about the context in which it was created.

---

I'm a journalist at the Guardian newspaper, and I've been a journalist for most of my career. We have an office down the road in SoHo, where I work on the interactive news team with three others. It just so happens that in my current job, instead of writing English, I write JavaScript.

These are a few of the recent projects my team and I have worked on [VIDEOS]. They range from multi-part investigations into the immigration crisis to exploratory data visualisations around voter rights in different states, through to epidemiological simulations, and thoroughly frivolous things such as a real-time translation of the State of the Union address into emojis.

In other words, every single project we do is radically different from the last, in terms of tone, audience, structure, and the technologies used. But there a few recurring themes:

* Our work is very visual. There's often a lot happening on the screen - lots of animations, lots of transitions, lots of SVG mixed in with the HTML.
* We're not given a brief. We're developing applications at the same time as we're doing background research and trying to understand complex datasets, often into stories that are changing under our feet. So there are no discrete development stages - it's lightning fast and iterative. We don't build prototypes and then build the 'real' app - the one evolves into the other, which means our prototypes have to be just as performant and robust as the finished product.
* We don't control the page. We have to inject content into a potentially hostile environment, with ever-changing CSS, and badly-written advertising code hogging cycles. Our work could be seen on desktop or mobile browsers, or in webviews inside mobile apps - ours, or Facebook's or someone else's. We try to avoid using iframes, because they introduce all kinds of limitations.
* We work against deadlines that would make most developers wince. A traditional Agile sprint is what, 2 weeks? 4, often? In the news business, four weeks isn't sprinting, it's limping into irrelevance.

And here's the thing - a lot of the people working on teams like ours are not 'ninja rockstars'. They're people who have taught themselves to program because they believe in the power of the web to enable new forms of journalism. And a lot of those teams have discovered that writing flexible, responsive, high performance applications under extreme time pressure is really difficult. Who knew, right?

---

So about three years ago, I was thinking about this problem, and trying to imagine what a tool that helped wrangle all this complexity would look like. And it seemed to me that 90% of the code I was writing was manipulating the DOM into a particular structure. That's a lot of what writing web apps consists of! Now a lot of frameworks were, and are, very heavily focused on things like model validation, and persistence, and routing, and lots of other things that frankly didn't make *our* lives any easier.

But this idea that you're trying to work the DOM into a particular state: we already have a really good concept for that. It's called HTML! And you might think that the DOM is a lousy paradigm for modern application development, and maybe you're right, but that's a separate conversation - the point is that the relationship between HTML and the DOM is one that's pretty easy to grasp - so much so that when you look at the DOM tree in your dev tools, it's formatted to look like HTML. (This is what DOM outlines used to look like... [IE screenshot])

So maybe we can just use templates? Everyone knows how templates work - you describe the state of your app in HTML, leaving placeholders for the bits that are going to change. And then your template library turns that into a function that generates the HTML, which you then inject into your page.

And for a long time that was a fairly popular idea. There are *loads* of template libraries out there. But it turns out there are some real problems with this approach. Consider a template like this:

[INPUT KEEPS BLOWING ITSELF OUT]

Or something like this:

[LONG TABLE TAKES AGES TO RE-RENDER ON SORT]

Or an example with SVG:

[SCATTERPLOT WITH SELECTED ITEM, CROSSHAIRS, WHATEVER]

* It's slow, because we have to keep creating new DOM
* It's slow, because we have to keep garbage collecting old DOM
* Event listeners! You're forced to use event delegation, whether or not it actually makes sense
* The DOM contains state, like it or not. You have to deal with that somehow

So to deal with this, developers often break their application apart into tiny chunks - instead of having a template for your todo list, you have a template for an individual todo. And you end up having to wire up all these tiny parts of your app, split into dozens of tiny files, by passing events around. Sometimes it's really helpful to be able to consider parts of your app in isolation, but you lose something in the process - it becomes really hard to reason about the behaviour of your app in a holistic way. You can't get that birds' eye view any more. And so where our apps would once have been full of 'jQuery spaghetti', they're now full of what I sometimes call 'MVC duct tape'.

If you're using SVG, you can't use this approach at all, because there's no SVG equivalent of `view.innerHTML = '<article class="todo">...</article>'`. So people who work in data visualisation haven't been able to use declarative techniques - instead they manipulate the DOM programmatically using libraries like D3, which is extremely powerful, and *sort of* declarative, but not like templates are. It has a famously frightening learning curve.

---

So that's string-based templating - Mustache, Handlebars, Underscore templates, EJS, dust.js, and a million others all follow that basic path. There is an alternative, and that's DOM-based templating, but in my view it's an approach with severe limitations:

* The expressiveness of DOM-based templates is limited to what's valid HTML, which means you end up complecting content with control flow.
* Server-side rendering is basically impossible without Rube Goldberg-esque systems involving JSDOM or PhantomJS
* You have to hack around things like `<img src='{{src}}'>`, if you don't want a console full of network and rendering errors

The new `<template>` tag has solved some of the problems of DOM-based templating, but fundamentally you're asking the DOM to do something it isn't designed for, and writing this sort of thing (`document.importNode(document.querySelector('template').content,true)` is *exactly* what we've been trying to avoid.

---

[WALL]

But what if you could use the declarative power of template-driven app development, without all those sacrifices? What if you could treat your template as a blueprint for an interactive application, rather than a tool for stamping out HTML?

That's what Ractive does. It takes a template string, and parses it into a compact tree representation. When you render that template, it constructs a lightweight virtual DOM with bindings to your data. From there, it can do surgical DOM manipulation - only the parts of your app that have changed need to be updated. Because of that, it's fast, and it avoids the problems we encountered before:

[REPEAT THE EXAMPLES FROM EARLIER]

At the time, this was a fairly novel idea. Since then, at least two other teams have independently developed very similar tools - Meteor have Blaze, and Ember have HTMLBars, which I take as confirmation that we're not crazy. [SHOW SIMILAR SITUATIONS WITH EDISON, MARCONI, BELL...]

---

Since I just said the words 'virtual DOM', I have to briefly talk about React. React and Ractive came out at about the same time, and they agree in a lot of ways about the right way to develop applications, but they have a very different idea about 'virtual DOM'. I won't go deeply into the differences between the two libraries, other than to briefly explain what that difference is: in React, the virtual DOM is a snapshot of your app at a given moment in time, which is compared against the previous snapshot to figure out how to update the DOM. In Ractive, the virtual DOM is a persistent data structure that continually updates to reflect the current state of your app. The end result is the same - both systems exist to figure out the minimal set of changes that need to be applied to the real DOM, but there are some important differences that fall out of that distinction - I won't go into them now, but I'd be happy to nerd out about it later if that's what you're into.

---

[LOOKS AT WATCH] Right, it's... demo time. We'll start with a simple hello world:

```js
var ractive = new Ractive({
	el: 'body',
	template: '<h1>Hello world!</h1>'
});
```

Does more or less what you'd expect. But we want to make our template a bit more templatey, so we'll turn 'world' into a piece of data:

```js
var ractive = new Ractive({
	el: 'body',
	template: '<h1>Hello {{name}}!</h1>',
	data: {
		name: 'world'
	}
});
```

So far, it's behaving like a normal string templating system. But the crucial difference is that we can change the data *after* it's been rendered:

```js
ractive.set( 'name', 'everybody' );
```

Just to prove that it's only updating the part of the DOM that actually needs to change, I'm going to change the style of the `<h1>` element:

```js
h1 = document.querySelector( 'h1' );
h1.style.color = 'red';
h1.style.fontFamily = 'Comic Sans MS';
```

Now, when we update the data, it's going to leave that `<h1>` alone:

```js
ractive.set( 'name', 'Applicative' );
```

So far that's not a massively impressive demo, but I want you to note an important shift that's just happened - we're updating the DOM, but we're not interacting with the DOM. We're using a *data-centric* API rather than a *DOM-centric* one. We didn't have to put a `<span>` inside the `<h1>` with a particular class name so that we could select it. We can change the template in important ways - we can change the elements we're using...

```js
ractive.resetTemplate(
	'<p>Hello {{name}}!</p>'
);
```

...or use the same data in other places...

```js
ractive.resetTemplate(
	'<p>Hello {{name}}!</p><p>It\'s nice to meet you, {{name}}.</p>'
);
```

...and we don't have to change anything else about our program. A lot of you have probably had that experience at some point where you wanted to tidy up one of your templates, but you ended up breaking everything, because suddenly the CSS selectors you were using in your JavaScript no longer apply! And so refactoring becomes this incredibly costly process, and your app grows brittle and unwieldy as a result. When you have a data-centric API, rather than a DOM-centric one, that doesn't happen, because everything is decoupled in the right way.

---

Let's take that hello world and turn it into something more useful. Let's say it's the late 90s and we're building a web portal, and this is our welcome screen. We might want to give the user useful information, like what the time is. At this point I'm going to split the template out into a separate block, so we get all that nice syntax highlighting:

```html
<h1>Hello {{name}}!</h1>
<p>It's <strong>{{datetime}}</strong>.</p>
```

```js
var ractive = new Ractive({
	el: 'body',
	template,
	data: {
		name: 'Applicative',
		datetime: new Date()
	}
});

var interval = setInterval( () => {
	ractive.set( 'datetime', new Date() );
}, 1000 );
```

So, that's telling us some useful information, but it looks a bit awkward - it's just using the Date object's `toString()` method, which is a bit ugly. There's a library called moment.js which is really useful for working with dates - we can use that to format the date. One way would be to do it like so:

```js
clearInterval( interval );

interval = setInterval( () => {
	ractive.set( 'datetime', moment( new Date() ).format( 'MMMM Do YYYY h:mm:ss a' ) );
}, 1000 );
```

And that works, but it's actually not ideal, because maybe we want to use that date object in another way, but now we've just got that string. So instead, let's do the formatting right there in our template:

```html
<h1>Hello {{name}}!</h1>
<p>It's <strong>{{moment(datetime).format('MMMM Do YYYY h:mm:ss a')}}</strong>.</p>
```

```js
var ractive = new Ractive({
	el: 'body',
	template,
	data: {
		name: 'Applicative',
		datetime: new Date(),
		moment
	}
});

var interval = setInterval( () => {
	ractive.set( 'datetime', new Date() );
}, 1000 );
```

Some of you will look at that in abject horror. 'He's got logic in his templates! He's violating separation of concerns! Burn him!' But think for a moment - pun intended - and you'll see that it's absolute piffle and tosh. It's nonsense! The whole 'logicless templates' thing is a triumph of dogma over common sense and experience.

People will tell you that you shouldn't have business logic in the front, and they're right. But this isn't business logic, it's presentation logic, and you can make the case just as forcefully that it doesn't belong in the back. Think about separation of concerns - what is concerned with that particular textual representation? Only this component! So 'separation of concerns' actually *demands* that the logic live there.

There's another important engineering concept, which is that other things being equal, code should be local to its effects. That's how you avoid having files full of zombie code, where you're scared to delete anything in case of unintended consequences. If you decide that you want to use a different formatting string, you can just write it right there in the template, with a cast iron guarantee that it won't affect anything else. When you're building things quickly, having that level of confidence is an absolute godsend.

So when the designer comes along and says 'we should have the date and the time separate', it's as simple as this:

```html
<h1>Hello {{name}}!</h1>
<p>
  Today is {{moment(datetime).format('MMMM Do YYYY')}}.
  The time is <strong>{{moment(datetime).format('h:mm:ss a')}}</strong>.
</p>
```

There's absolutely no way that it could break anything else. We don't have to smother our application in tests to know that we're doing the right thing.

Some of you might have other concerns - you might be worrying about XSS vulnerabilities, or pernicious side-effects, or performance problems with `eval()`. We're not blindly evaling anything - we're actually parsing the JavaScript into an AST, and the parser forbids anything that could result in those effects - no assignment operators, no function literals, no `new` keyword and so on, which means we can evaluate these expressions in a safe and efficient way.

---

I'm going to make an SVG clock for our dashboard.

```html
<svg viewBox='0 0 100 100'>
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
</svg>
```

```js
var clock = new Ractive({
	el: 'body',
	template,
	data: {
		minor: new Array( 60 ),
		major: new Array( 12 ),
		datetime: new Date()
	}
});

var interval = setInterval( () => {
	clock.set( 'datetime', new Date() );
}, 1000 );
```

And so we've built a functional clock in a few lines of code. Just think for a moment about how you'd go about writing that using traditional DOM manipulation techniques. Instead of simply describing how it should look, and occasionally feeding it new data, you'd have some render logic that was separate from, but coupled to, your update logic, and anyone who wanted to understand the code would have to read through it and form a fairly complex mental model about what was happening. With templates, that's not the case, because templates are as easy to read as they are to write, and that makes collaboration with other developers and designers so much easier.

We *could* have downloaded a clock widget from some sketchy corner of the internet - god knows there's enough of them - but then we're limited to the configuration options exposed by that library.

Chances are, we'll want to reuse this clock in other parts of our app. So let's turn it into a reusable component:

```js
var Clock = Ractive.extend({
	template,
	css, // <-- this is encapsulated!
	data: {
		minor: new Array( 60 ),
		major: new Array( 12 )
	}
});

var clock = new Clock({
	el: 'body',
	data: {
		datetime: new Date()
	}
});
```

---

And now, if we *register* that component, we can use it inside other templates:

```js
var ractive = new Ractive({
	el: 'body',
	template,
	data: {
		name: 'Applicative',
		datetime: new Date(),
		moment: moment
	},
	components: { Clock }
});

var interval = setInterval( () => {
	ractive.set( 'datetime', new Date() );
}, 1000 );
```

```html
<h1>Hello {{name}}!</h1>
<p>
  Today is {{moment(datetime).format('MMMM Do YYYY')}}.
  The time is <strong>{{moment(datetime).format('h:mm:ss a')}}</strong>.
</p>

<Clock datetime='{{datetime}}'/>
```

This is very similar to the web components idea, except look ma, no polyfills! (And we're not blindly shoving stuff into the global namespace, and data doesn't get coerced to a string as it flows through the system.) And it turns out that this way of building apps - creating a tree of components that describe how we want our app to look at any given time, and just repeatedly throwing data at it - really, really works.

---

At the Guardian, we've taken the idea of components to its logical extreme. Our apps are mostly written as components in HTML files, that look something like this:

```html
<!-- example -->
```

The template, styles and behaviours - sometimes even the data - that belong to a particular component are written right there into the component definition. Our build process turns these HTML component files into JavaScript modules alongside our various helper functions, which are then browserified together into a distributable bundle.

It's a heretical way of working, but one that makes us incredibly productive compared to how we used to do things. The relationship between our HTML, CSS and JavaScript is clear and precise, and that becomes so important when you have to work on code that you didn't write - all of us on the team have at some point had the experience of having to fix someone else's bug, and a component-driven architecture is the thing that has always saved us, because it's so easy to figure out where the problem is.

But while it might be heretical, it's also very familiar. Think back to the first time you started learning how to build stuff for the web - chances are, you had an HTML file, with a `<style>` tag at the top and a `<script>` tag at the bottom. And you were probably really happy with that, until people started haranguing you about 'best practices'.

---

Here's another 'best practice' that took root somewhere between DHTML and Web 2.0:

```html
<!-- bad! -->
<div onmousemove='redraw(event)'>
	<!-- content goes here -->
</div>

<!-- good! -->
<div class='target'>
	<!-- content goes here -->
</div>
```

```js
// bad!
function redraw () {
	// code goes here
}

// good!
(function () {
	function redraw () {
		// code goes here
	}

	document.querySelector( '.target' ).addEventListener( 'mousemove', redraw );
})();
```

In the first case, the *action* (moving the mouse), and the *intention* (redrawing something) are very clearly linked. In the second case, that's not true - we have a class name, but it's not obvious what it's for. Is it for styling something, or does it just exist so that we can target it in our JavaScript? In many apps, it's both! It's a bad form of coupling.

http://jsfiddle.net/rich_harris/7kdv29q1/

The main reason we don't do things the old-school way is because you have to shove things into the global namespace - like that `redraw` function - otherwise it won't work. That's not cool. But if you're going to go the effort of parsing a template and creating a virtual DOM so that you can bind data to it... then why not handle your events at the same time?

```html
<div on-mousemove='redraw(event)'>
	<svg>
		<circle class='eye' cx='50' cy='50' r='48'/>
		<circle class='pupil' cx='{{50+(x-50)/10}}' cy='{{50+(y-50)/10}}' r='10'/>

		<circle class='eye' cx='150' cy='50' r='48'/>
		<circle class='pupil' cx='{{150+(x-150)/10}}' cy='{{50+(y-50)/10}}' r='10'/>
	</svg>
</div>
```

```js
var ractive = new Ractive({
	el: 'body',
	template,
	data: {
		x: 100,
		y: 50
	},
	redraw: function ( event ) {
		this.set({
			x: event.original.clientX,
			y: event.original.clientY
		});
	}
});
```

This really is the best of both worlds - we have that very clear link between action and intention (mousemove literally equals redraw), we don't have to abuse class names so that we can bind events, we don't have to worry about removing event listeners when we remove it from the DOM, because Ractive handles that for us. And yet we also keep everything cleanly encapsulated and out of the global namespace.

---

Let's call it the wisdom of the ancients. In the days of yore - before ES6, before web components, before modules, before Angular, before Backbone, before jQuery - that's how people wrote code. And they were happy and productive.

Staff officers in the military still read The Art of War by Sun Tzu. They don't ride into battle on horseback and throw spears at each other, generally speaking, but they keep that ancient wisdom alive, because they recognise that while the details change, the big picture stays largely the same. We in the web development are not good at keeping alive the wisdom of the ancients. We obsess over the new and shiny, and treat tried-and-tested techniques as laughably outdated. There's a real cost to that, which I'm going to talk about soon.

---

First, though, I'm going to briefly touch on what's going on under the hood when you create a Ractive instance and interact with it.

The first thing that gets created is what we refer to internally as the viewmodel. This is where all your data lives, along with things like computed properties. As you request data from the viewmodel, it lazily generates a map of what we refer to as keypaths - so if `foo` is an object with a `bar` property equal to `42`, the viewmodel understands that the `foo.bar` keypath refers to that value, and that if `foo` has changed, `foo.bar` may have changed as well.

Next, we create the virtual DOM from our template. As items in the virtual DOM get created, they register themselves as dependents of particular keypaths as necessary.

The final step is to render the virtual DOM. In most cases, you're rendering the virtual DOM to the real one - that's what I've been showing you so far in this presentation - but you can just as easily render it to HTML, which means that you can run Ractive in node and do server-side rendering.

So now we've got our Ractive instance, and we want to update it. It goes something like this:

* `ractive.set('name', 'everybody')
* This creates a batch of operations
* The viewmodel is told about the change. It checks that something has in fact changed - if not, nothing need happen
* The viewmodel looks at its list of dependents and sees which depend on `name`. If there are any computed properties that depend on `name`, directly or indirectly, the viewmodel figures out if any of those properties need to be included in the update.
* The virtual DOM dependents are told about the change. If they need to do any work, they don't do it straight away, because that could result in duplicate work (if an attribute had two mustache tags, for example). Instead, they add themselves to the batch of operations
* Once that's done, the batch is 'flushed', and the DOM is updated.

This all happens synchronously, which means that as soon as you've called `ractive.set()`, you can query the DOM, which turns out to be essential for a lot of visual work where you often need to do things like measure elements after an update. So your code is very predictable, and you have very precise control, but you still get the performance benefits of batched DOM updates.

Individual elements in a Ractive template can have intro and outro transitions, like this:

```html
<!-- TODO -->
```

So even though the initial update is synchronous, `ractive.set()` actually returns a Promise, which resolves once any transitions have completed. This makes it easy to create chained sequences, like this.

```html
<!-- TODO -->
```

---

That was a fairly brief demonstration of what it's like to build apps with Ractive. Hopefully it's piqued your interest, and convinced you that as brilliant as React is, it's not the only game in town, and the Ractive/Meteor/Ember approach has a lot to recommend it.

But that's not really the point of this presentation.

---

One of the big promises of the digital revolution was the promise of disintermediation. We wanted to use the power of the network to connect people - buyers to sellers, borrowers to lenders, artists to fans, people on Craiglist with weird fetishes to other people on Craigslist with weird fetishes.

And we did it! We got rid of all those intermediaries, in all sorts of arenas.

But there's one group of intermediaries that we haven't got rid of - ourselves. If you want to create interactive applications - as a journalist, or as an educator, or an academic, or a community leader, or an artist, or an activist - if you want to use web technologies to express ideas that can't be expressed by other means, or to connect with people who you couldn't otherwise connect with - you can't. Unless you go through us.

We are an extraordinarily powerful group of people. It might not feel that way, but we are. We have extraordinary economic power, because the need for software is insatiable. We joke about how annoying it is to get contacted by recruiters, who want to get us well-paid jobs doing something we'd be doing for fun anyway! Meanwhile, other people's jobs are being automated into oblivion.

And we have extraordinary social power, because we're the ones making the systems and services that form the fabric of modern society. The assumptions that we have - about the nature of identity, about society, about the right to privacy, about which industries deserve to be disrupted - these assumptions find expression in the things we create. It's unavoidable.

So we have to ask ourselves: are we the best people to wield that power? [YOU LOT?] Is it really conceivable that this tiny, vastly unrepresentative sliver of humanity, is capable of making the right decisions on behalf of everyone else? It's mathematically impossible, even if you don't think that Silicon Valley's outsize influence on our culture is a problem.

---

[img from http://management.curiouscatblog.net/2012/02/22/learn-to-code-to-help-your-career/]

The stock answer is 'learn to code'. If you want to be part of the modern economy, learn to code. God, how many times did we hear that in 2014? And yes, the learn to code movement is a good thing. But for most people, the 'learn to code' journey goes something like this:

* Learn about variables and for loops and data types. (This is a bit like learning French by reading about how to conjugate verbs and pluralise nouns before being exposed to any vocabulary or examples of people speaking French.) There's a huge focus on writing syntactically correct code, and almost none on code comprehension, or how to develop the right mental habits for modelling the world as a programmer would.
* Go through a contrived example in a interactive coding environment, where friendly characters correct your mistakes, and offer to fix your code if you get stuck.
* Think 'I can do this! It's *way* easier that I thought it would be.'
* Get to the end of the first set of tutorials, chomping at the bit to create something of your own.
* Start writing some code, which, without the handrails, is buggy and chaotic. Tasks which seem like they should be simple, like representing state consistently throughout the page, involve a lot of really boring, hard-to-write code.
* Wonder 'am I doing this right?' and start Googling for help
* Discover a list of the bare minimum you're supposed to understand in order to build stuff on the web:
	* HTML validation
	* meta charset
	* DNS
	* image compression
	* SEO
	* Sitemaps
	* RSS
	* robots.txt
	* CSS preprocessors (SASS or LESS? you have to have an opinion)
	* AMD
	* CommonJS
	* ES6 modules
	* Transpilers
	* Grunt
	* Gulp
	* Minifiers
	* jQuery
	* Backbone
	* Angular
	* Linting
	* Tests
	* Cross-browser testing tools
	* Accessibility
	* Internationalisation
	* Analytics
	* GitHub
	* The command line
	* npm
	* Canvas and WebGL
	* SVG
	* Devtools
	* Sublime
	* Bootstrap
* 'But I just wanted to build stuff?'

https://twitter.com/webreflection/status/501446017292988417

And so many people just give up at that point, because they feel like the barriers are too high for them to overcome. It takes a very stubborn person, with a lot of free time, to fight past that initial feeling of powerlessness, and get to the point where you have some idea what you're doing.

I've seen it happen, so many times, and every time it's a tragedy. Because those people have ideas, but they can't share them with the rest of us, and our culture is dimininished as a result.

http://www.producthunt.com/posts/ractive-js

I believe that the best way to help people break through that barrier is to eliminate that powerlessness, by giving people tools that allow them to be productive *before* they understand all the underlying concepts - just like when you're learning French, you learn how to ask for a cheese sandwich before you learn about the pluperfect subjunctive tense.

But that's not what our community chooses to focus on. When we create tools, we create them for ourselves and for each other - people who are already inside the circle. There's been so much innovation in our world in the last few years, and it's fantastic, but so many of these tools simply aren't accessible to the vast majority of programmers who just want to bloody build something. No-one - no-one - should have to learn what transclusion and dependency injection are in order to build an interactive app. Nor should they have to install a special syntax highlighter in order to write templates.

Here's a checklist of a few things you can do when you're building tools for other programmers:

* Write the README first. Invent the best API you can, and then go away and implement it. Too many programmers do the implementation first and then worry about the API, and that's backwards, because you can always fix a lousy implementation, but APIs are very hard to change
* If you can eliminate dependencies, do it! If you can't, make sure you offer a build with dependencies included. This is important.
* Use the Universal Module Definition, so that your library works as an AMD module, a CommonJS module, or as a `<script>` tag.
* Publish on npm, but have a download link as well.
* Have good error messages. If you can link to your documentation in your error messages, do it.
* Don't make people touch the command line if you can help it. As far as possible, build steps should be optional.
* Work on your documentation. If you can provide a REPL or an interactive tutorial, do it.
* Eliminate jargon.
* Most importantly, try and put yourself in the shoes of a beginner.

Ractive isn't going to single-handedly break down the wall. It would be delusional to think otherwise. And we don't nail everything on that list - most, but not all. But when we on the Ractive team make decisions about what goes into the library, we always ask ourselves: will this make it easier for non-experts, or will it simply confuse them? And a funny thing happens when you make tools that try to guide novices into the pit of success: you make it easier for everyone.

---

I'm optimistic that the people in this room will feel the same way that I do, because everyone I talk to in the tech industry sincerely wants to see web development become more inclusive. My message for you today is that you can make a real difference by thinking about the ways in which you can help dismantle the barriers to entry. And by the way you should all be using Ractive.

Thank you.
