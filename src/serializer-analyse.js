const fetch = require('isomorphic-fetch')
const rp = require('request-promise-native')

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

// Send a request to spotify with our client id and secret
// to get an access token back. A token is required for certain
// Spotify API endpoints. Like audio-analysis.
// Because I couldn't configure node-fetch to send the request correctly,
// we're using request here instead of fetch.
const requestAccessToken = async function (id, secret) {
	if (!id || !secret) {
		throw new Error('Missing Spotify secrets. Check your .env file')
	}

	let auth = new Buffer(`${id}:${secret}`).toString('base64')

	let options = {
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			Authorization: 'Basic ' + (auth)
		},
		form: {
			grant_type: 'client_credentials' // eslint-disable-line camelcase
		},
		json: true
	}

	return await rp.post(options)
}

const fetchData = async function (id) {
	let token = await requestAccessToken(clientId, clientSecret)
	let url = `https://api.spotify.com/v1/audio-features/${id}`
	// let url = `https://api.spotify.com/v1/audio-analysis/${id}`

	return await fetch(url, {
		headers: {
			Authorization: 'Bearer ' + token.access_token
		}
	})
}

const serialize = function (json) {
	return json
}

module.exports.fetchData = fetchData
module.exports.serialize = serialize

