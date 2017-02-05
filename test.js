const micro = require('micro')
const test = require('ava')
const listen = require('test-listen')
const fetch = require('isomorphic-fetch')
const mediaNow = require('./index')

test('the server runs and returns a 404 error message', async t => {
	const service = micro(mediaNow)
	const url = await listen(service)
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
	const service = micro(mediaNow)
	const url = await listen(service)
	const body = await fetch(`${url}/${provider}/${id}`)
	const json = await body.json()
	t.is(body.status, 200)
	verifyProvider(t, provider, id, json)
})

test('discogs provider', async t => {
	let provider = 'discogs'
	let id = 1728315
	const service = micro(mediaNow)
	const url = await listen(service)
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

