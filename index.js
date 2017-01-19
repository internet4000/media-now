require('dotenv').config()

const {send} = require('micro')
const serializerYoutube = require('./src/serializer-youtube')
const serializerVimeo = require('./src/serializer-vimeo')
const serializerDiscogs = require('./src/serializer-discogs')

// Add our serializers
let serializers = {}
serializers.youtube = serializerYoutube
serializers.vimeo = serializerVimeo
serializers.discogs = serializerDiscogs

module.exports = async function (request, response) {
	// Get the arguments from the URL. We expect a format like "/provider/id"
	let args = request.url.split('/')
	let provider = args[1]
	let id = args[2]

	// Get our serializer
	let serializer = serializers[provider]
	if (!serializer) {
		send(response, 404, {
			error: "Please use an URL like '/{youtube/vimeo/discogs}/id'",
			help: 'https://github.com/oskarrough/media-now'
		})
		return
	}

	// Fetch the data.
	let data = await serializer.fetchData(id)

	// Convert it to JSON.
	let json = await data.json()

	// Extract only the data we need.
	let serializedJson = serializer.serialize(json)

	return serializedJson
}
