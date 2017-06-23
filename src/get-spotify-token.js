const rp = require('request-promise-native')

// Spotify requires an "access token" to query their API. This returns it.
// Because I couldn't configure node-fetch to send the request correctly,
// we're using request here instead of fetch.

module.exports = async function () {
	const id = process.env.SPOTIFY_CLIENT_ID
	const secret = process.env.SPOTIFY_CLIENT_SECRET

	if (!id || !secret) {
		throw new Error('Missing Spotify secrets. Check your .env file')
	}

	const auth = new Buffer(`${id}:${secret}`).toString('base64')
	const options = {
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
