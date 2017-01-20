const fetch = require('isomorphic-fetch')

const key = process.env.VIMEO_KEY

const buildURL = function (id) {
	return `https://api.vimeo.com/videos/${id}`
}

const fetchData = async function (id) {
	if (!key) {
		throw new Error('A VIDEO_KEY in your .env file is required')
	}
	let data = await fetch(buildURL(id), {
		// Vimeo requires an auth header.
		headers: {
			Authorization: key
		}
	})
	return data
}

const serialize = function (json) {
	if (!json) {
		throw new Error('No JSON items to work with')
	}

	const item = json
	// return item // use this to debug

	return {
		provider: 'vimeo',
		// id: item.id,
		id: item.uri.split('/')[2], // no id in the JSON?
		url: item.link,
		title: item.name,
		thumbnail: item.pictures.sizes[0].link,
		duration: item.duration
	}
}

module.exports.fetchData = fetchData
module.exports.serialize = serialize
