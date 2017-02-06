const fetch = require('isomorphic-fetch')

const fetchData = async function (id) {
	return await fetch(`https://api.spotify.com/v1/tracks/${id}`)
}

const serializeOne = item => ({
	provider: 'spotify',
	id: item.id,
	url: item.external_urls.spotify,
	title: `${item.artists[0].name} - ${item.name}`,
	thumbnail: item.album.images[1].url,
	duration: (item.duration_ms / 1000),
	extras: {
		isrc: item.external_ids.isrc,
		popularity: item.popularity,
		previewUrl: item.preview_url
	},
	mediaNow: {
		analyse: `https://media.now.sh/analyse/${item.id}`
	}
})

const serialize = function (json) {
	// return json // use this to debug
	if (json.id) {
		return serializeOne(json)
	}
	return {error: 'no results'}
}

module.exports.fetchData = fetchData
module.exports.serialize = serialize

