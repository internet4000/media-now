const fetch = require('isomorphic-fetch')

const buildURL = function (query) {
	const type = 'track'
	const limit = 10
	const endpoint = `https://api.spotify.com/v1/search`
	return `${endpoint}?q=track:${query}&limit=${limit}&type=${type}&`
}

const fetchData = async function (id, args) {
	if (id === 'search') {
		console.log(args)
		let query = args[3]
		return await fetch(buildURL(query))
	}
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
		previewUrl: item.preview_url,
		_analysis: `http://localhost:3000/analyse/${item.id}`
	}
})

const serializeMany = items => items.map(item => {
	// return serializeOne(item)
	return {
		provider: 'spotify',
		id: item.id,
		title: `${item.artists[0].name} - ${item.name}`,
		_spotify: `http://localhost:3000/spotify/${item.id}`
	}
})

const serialize = function (json) {
	// return json // use this to debug

	// If we have items, assume it was a search.
	if (json.tracks && json.tracks.items.length > 0) {
		return serializeMany(json.tracks.items)
	}

	// Otherwise it was a single track.
	return serializeOne(json)
}

module.exports.fetchData = fetchData
module.exports.serialize = serialize

