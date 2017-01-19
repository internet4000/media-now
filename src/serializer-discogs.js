const fetch = require('isomorphic-fetch')

const buildURL = function (id) {
	return `https://api.discogs.com/releases/${id}`
}

const fetchData = async function (id) {
	return await fetch(buildURL(id))
}

const serialize = function (json) {

	if (json.length === 0) {
		throw new Error('No JSON items to work with')
	}

	return {
		provider: 'discogs',
		id: json.id,
		url: json.uri,
		artists: json.artists,
		year: json.year,
		labels: json.labels,
		title: json.title,
		genres: json.genres,
		styles: json.styles
	}
}

module.exports.fetchData = fetchData
module.exports.serialize = serialize
