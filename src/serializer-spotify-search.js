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

const fetchData = async function (id) {
	return await fetch(buildURL(id))
}

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
	if (json.tracks && json.tracks.items.length > 0) {
		return serializeMany(json.tracks.items)
	}
	return {error: 'no results'}
}

module.exports.fetchData = fetchData
module.exports.serialize = serialize

