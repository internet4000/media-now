const fetch = require('isomorphic-fetch')

// https://api.spotify.com/v1/search?type=track&q=Hugh%20Masekela%20-%20Don%27t%20Go%20Lose%20It%20Baby
const buildURL = function (query) {
	const type = 'track'
	const limit = 3
	return `https://api.spotify.com/v1/search?type=${type}&query=${query}&limit=${limit}`
}

const fetchData = async function (id) {
	return await fetch(buildURL(id))
}

const serialize = function (json) {
	if (!json.tracks.items.length) {
		throw new Error('No JSON items to work with')
	}

	const item = json.tracks.items[0]
	// return item // use this to debug

	return {
		provider: 'spotify',
		id: item.id,
		duration: (item.duration_ms / 1000),
		url: item.external_urls.spotify,
		title: `${item.artists[0].name} - ${item.name}`,
		thumbnail: item.album.images[1].url,
		extras: {
			isrc: item.external_ids.isrc,
			popularity: item.popularity,
			preview_url: item.preview_url
		}
	}
}

module.exports.fetchData = fetchData
module.exports.serialize = serialize

