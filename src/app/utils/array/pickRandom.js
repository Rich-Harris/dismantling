export default function pickRandom ( arr ) {
	return arr[ ~~( Math.random() * arr.length ) ];
}