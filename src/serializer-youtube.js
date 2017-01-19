const fetch = require('isomorphic-fetch')
const {asSeconds} = require('pomeranian-durations')

const key = process.env.YOUTUBE_KEY

const buildURL = function (id) {
	return `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${id}&key=${key}`
}

const fetchData = async function (id) {
	if (!key) {
		throw new Error('No YOUTUBE_KEY in your environement file')
	}
	return await fetch(buildURL(id))
}

const serialize = function (json) {
	if (json.items.length === 0) {
		throw new Error('No JSON items to work with')
	}

	const item = json.items[0]
	// return item // use this to debug

	return {
		provider: 'youtube',
		id: item.id,
		url: `https://www.youtube.com/watch?v=${item.id}`,
		title: item.snippet.title,
		thumbnail: item.snippet.thumbnails.default.url,

		// Once date-fns supports durations let's switch to that.
		// See https://github.com/date-fns/date-fns/pull/348
		duration: asSeconds(item.contentDetails.duration)

		// To get privacy info: set part=status --> item.status.embeddable = boolean
	}
}

module.exports.fetchData = fetchData
module.exports.serialize = serialize
