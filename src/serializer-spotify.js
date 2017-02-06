const fetch = require('isomorphic-fetch')

// Take a query like "Artist - Track title"
// and return {artist, title}
const splitQuery = query => {
	let q = decodeURI(query)
	if (!q.includes(' - ')) {
		return false
	}
	let [artist, ...track] = q.split(' - ')
	track = track.join(' - ')
	return {artist, track}
}

const buildURL = function (query) {
	const endpoint = `https://api.spotify.com/v1/search`
	const type = 'track'
	const limit = 10

	// Spotify returns much more precise results when
	// artist and track are specified seperately.
	let info = splitQuery(query)
	if (info.artist && info.track) {
		query = `artist:${info.artist}+track:${info.track}`
	}

	return `${endpoint}?limit=${limit}&type=${type}&q=${query}`
}

const fetchData = async function (id, args) {
	if (id === 'search') {
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
		previewUrl: item.preview_url
	},
	mediaNow: {
		analyse: `http://localhost:3000/analyse/${item.id}`
	}
})

const serializeMany = items => items.map(item => {
	return {
		provider: 'spotify',
		id: item.id,
		title: `${item.artists[0].name} - ${item.name}`,
		mediaNow: {
			spotify: `http://localhost:3000/spotify/${item.id}`,
			analyse: `http://localhost:3000/analyse/${item.id}`
		}
	}
})

const serialize = function (json) {
	// return json // use this to debug

	// If we have items, assume it was a search.
	if (json.tracks && json.tracks.items.length > 0) {
		return serializeMany(json.tracks.items)
	}

	// Otherwise it was a single track.
	if (json.id) {
		return serializeOne(json)
	}
	return {error: 'no results'}
}

module.exports.fetchData = fetchData
module.exports.serialize = serialize

