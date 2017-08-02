require('dotenv').config()
const opbeat = require('opbeat').start({
	active: process.env.NODE_ENV === 'production'
})
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
	let args = req.url.split('/')
	let provider = args[1]
	let id = args[2]
	let serializer = serializers[provider]

	opbeat.setTransactionName(req.url)

	if (!serializer) {
		send(res, 404, {
			error: `Hello. No serializer found for '${provider}'.`,
			help: 'https://github.com/internet4000/media-now'
		})
		return
	}

	// Fetch the data, convert to json, extract what we need.
	try {
		let data = await serializer.fetchData(id)
		let json = await data.json()
		return serializer.serialize(json)
	} catch (err) {
		send(res, 404, {error: err.message})
	}
})
