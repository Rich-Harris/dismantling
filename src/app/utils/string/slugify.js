export default function slugify ( str ) {
	return str.toLowerCase().replace( /[^a-z]/g, ' ' ).trim().replace( /\s+/g, '-' );
}