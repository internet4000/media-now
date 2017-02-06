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
	let provider = 'youtube'
	let id = '1-VFPoW5S-M'
	const url = await listen(micro(mediaNow))
	const body = await fetch(`${url}/${provider}/${id}`)
	const json = await body.json()
	t.is(body.status, 200)
	verifyProvider(t, provider, id, json)
})

test('vimeo provider', async t => {
	let provider = 'vimeo'
	let id = '121814744'
	const url = await listen(micro(mediaNow))
	const body = await fetch(`${url}/${provider}/${id}`)
	const json = await body.json()
	t.is(body.status, 200)
	verifyProvider(t, provider, id, json)
})

test('discogs provider', async t => {
	let provider = 'discogs'
	let id = 1728315
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
	let provider = 'spotify'
	let id = '20efeySIfZoiSaISGLBbNs'
	const url = await listen(micro(mediaNow))
	const body = await fetch(`${url}/${provider}/${id}`)
	const json = await body.json()
	t.is(body.status, 200)
	verifyProvider(t, provider, id, json)
	t.truthy(json.mediaNow)
})

test('spotify-search provider', async t => {
	let provider = 'spotify-search'
	let query = 'Michael Jackson - Thriller'
	const url = await listen(micro(mediaNow))
	const body = await fetch(`${url}/${provider}/${query}`)
	const json = await body.json()
	console.log(json)
	const item = json[0]
	t.is(body.status, 200)
	t.is(item.provider, 'spotify')
	t.truthy(item.id)
	t.truthy(item.title)
	t.truthy(item.mediaNow)
	let firstWord = query.split(' ')[0].toLowerCase()
	let firstWordIsIncluded = item.title.toLowerCase().includes(firstWord)
	t.true(firstWordIsIncluded)
})

test('analyse provider', async t => {
	let provider = 'analyse'
	let id = '20efeySIfZoiSaISGLBbNs'
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
