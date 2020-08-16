require('dotenv').config()
const {send} = require('micro')
const microCors = require('micro-cors')

const youtube = require('./src/serializer-youtube')
const vimeo = require('./src/serializer-vimeo')
const discogs = require('./src/serializer-discogs')
const spotify = require('./src/serializer-spotify')
const spotifySearch = require('./src/serializer-spotify-search')
const analyse = require('./src/serializer-analyse')

const serializers = {
	youtube, vimeo, discogs, spotify,
	'spotify-search': spotifySearch,
	analyse
}

const cors = microCors({allowMethods: ['GET']})

module.exports = cors(async (req, res) => {
	const args = req.url.split('/')
	const provider = args[1]
	const id = args[2]
	const serializer = serializers[provider]

	if (!serializer) {
		send(res, 404, {
			error: `Hello. No serializer found for '${provider}'.`,
			help: 'https://github.com/internet4000/media-now'
		})
		return
	}

	// Fetch the data, convert to json, extract what we need.
	try {
		const data = await serializer.fetchData(id)
		const json = await data.json()
		return serializer.serialize(json)
	} catch (err) {
		send(res, 404, {error: err.message})
	}
})
