const fetch = require('isomorphic-fetch')
const getSpotifyToken = require('./get-spotify-token')

// This serializer provides audio-analysis for Spotify tracks.
// Currently using https://developer.spotify.com/web-api/get-audio-features/.

const fetchData = async function (id) {
	let token = await getSpotifyToken()
	let url = `https://api.spotify.com/v1/audio-features/${id}`
	// let url = `https://api.spotify.com/v1/audio-analysis/${id}`

	return await fetch(url, {
		headers: {
			Authorization: 'Bearer ' + token.access_token
		}
	})
}

const serialize = function (json) {
	json.provider = 'analyse'
	json.mediaNow = {
		spotify: `https://media.now.sh/spotify/${json.id}`
	}
	return json
}

module.exports.fetchData = fetchData
module.exports.serialize = serialize

