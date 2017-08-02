const micro = require('micro')
const test = require('ava')
const listen = require('test-listen')
const fetch = require('isomorphic-fetch')
const mediaNow = require('./index')

test('the server runs and returns a 404 error message', async t => {
	const url = await listen(micro(mediaNow))
	const body = await fetch(url)
	const json = await body.json()
	t.is(body.status, 404)
	t.is(typeof json.error, 'string')
})

function verifyProvider(t, provider, id, json) {
	t.is(json.provider, provider)
	t.is(json.id, id)
	t.truthy(json.url)
	t.truthy(json.title)
	t.truthy(json.thumbnail)
	t.truthy(json.duration)
}

test('youtube provider', async t => {
	const provider = 'youtube'
	const id = '1-VFPoW5S-M'
	const url = await listen(micro(mediaNow))
	const endpoint = `${url}/${provider}/${id}`
	const body = await fetch(endpoint)
	const json = await body.json()
	t.is(body.status, 200)
	verifyProvider(t, provider, id, json)
	t.truthy(json.status, 'it includes privacy status info')
})

test('endpoints returns 404 for non-exisiting ids', async t => {
	const id = 'this is probably not a valid id'
	const url = await listen(micro(mediaNow))
	const youtube = await fetch(`${url}/youtube/${id}`)
	t.is(youtube.status, 404)
	const discogs = await fetch(`${url}/discogs/${id}`)
	t.is(discogs.status, 404)
	const spotify = await fetch(`${url}/spotify/${id}`)
	t.is(spotify.status, 404)
	const vimeo = await fetch(`${url}/vimeo/${id}`)
	t.is(vimeo.status, 404)
})

test('vimeo provider', async t => {
	const provider = 'vimeo'
	const id = '121814744'
	const url = await listen(micro(mediaNow))
	const body = await fetch(`${url}/${provider}/${id}`)
	const json = await body.json()
	t.is(body.status, 200)
	verifyProvider(t, provider, id, json)
})

test('discogs provider', async t => {
	const provider = 'discogs'
	const id = 1728315
	const url = await listen(micro(mediaNow))
	const body = await fetch(`${url}/${provider}/${id}`)
	const json = await body.json()
	t.is(body.status, 200)
	// Can't use `verifyProvider` because Discogs has different data.
	t.is(json.provider, provider)
	t.is(json.id, id)
	t.truthy(json.url)
	t.truthy(json.genres)
	t.truthy(json.styles)
	t.truthy(json.year)
})

test('spotify provider', async t => {
	const provider = 'spotify'
	const id = '20efeySIfZoiSaISGLBbNs'
	const url = await listen(micro(mediaNow))
	const body = await fetch(`${url}/${provider}/${id}`)
	const json = await body.json()
	t.is(body.status, 200)
	verifyProvider(t, provider, id, json)
	t.truthy(json.mediaNow)
})

test('spotify-search provider', async t => {
	const provider = 'spotify-search'
	const query = 'Michael Jackson - Thriller'
	const url = await listen(micro(mediaNow))
	const body = await fetch(`${url}/${provider}/${query}`)
	const json = await body.json()
	const item = json[0]
	t.is(body.status, 200)
	t.is(item.provider, 'spotify')
	t.truthy(item.id)
	t.truthy(item.title)
	t.truthy(item.mediaNow)
	const firstWord = query.split(' ')[0].toLowerCase()
	const firstWordIsIncluded = item.title.toLowerCase().includes(firstWord)
	t.true(firstWordIsIncluded)
})

test('analyse provider', async t => {
	const provider = 'analyse'
	const id = '20efeySIfZoiSaISGLBbNs'
	const url = await listen(micro(mediaNow))
	const body = await fetch(`${url}/${provider}/${id}`)
	const json = await body.json()
	t.is(body.status, 200)
	t.truthy(json.mediaNow)
	t.truthy(json.energy)
	t.truthy(json.tempo)
	t.truthy(json.valence)
	t.truthy(json.danceability)
})
