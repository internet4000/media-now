require('dotenv').config()
const {send} = require('micro')
const microCors = require('micro-cors')
const youtube = require('./src/serializer-youtube')
const vimeo = require('./src/serializer-vimeo')
const discogs = require('./src/serializer-discogs')

const serializers = {youtube, vimeo, discogs}

const cors = microCors({allowMethods: ['GET']})
module.exports = cors(async (request, response) => {
	// An URL as `domain.com/youtube/id` is expected.
	let args = request.url.split('/')
	let provider = args[1]
	let id = args[2]
	let serializer = serializers[provider]

	if (!serializer) {
		send(response, 404, {
			error: 'Please use an URL like "/{youtube/vimeo/discogs}/id"',
			help: 'https://github.com/oskarrough/media-now'
		})
		return
	}

	// Fetch the data, convert to json, extract what we need.
	let data = await serializer.fetchData(id)
	let json = await data.json()
	return serializer.serialize(json)
})

