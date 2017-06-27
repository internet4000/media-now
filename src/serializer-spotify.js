const fetch = require('isomorphic-fetch')
const getSpotifyToken = require('./get-spotify-token')

// This serializer provides audio-analysis for Spotify tracks.
// Currently using https://developer.spotify.com/web-api/get-audio-features/.

const fetchData = async function (id) {
	const token = await getSpotifyToken()
	const url = `https://api.spotify.com/v1/tracks/${id}`
	return await fetch(url, {
		headers: {
			Authorization: 'Bearer ' + token.access_token
		}
	})
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

