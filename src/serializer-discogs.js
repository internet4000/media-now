const fetch = require('isomorphic-fetch')

const buildURL = function (id) {
	return `https://api.discogs.com/releases/${id}`
}

const fetchData = async function (id) {
	return await fetch(buildURL(id))
}

const serialize = function (json) {
	// return json
	if (!json.id) {
		throw new Error('No results found')
	}
	return {
		provider: 'discogs',
		id: json.id,
		url: json.uri,
		title: json.title,
		year: json.year,
		genres: json.genres,
		styles: json.styles,
		artists: json.artists,
		labels: json.labels
	}
}

module.exports.fetchData = fetchData
module.exports.serialize = serialize
