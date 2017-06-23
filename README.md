# Media Now

Get media information from YouTube and Vimeo videos, Spotify tracks and Discogs releases.

Media Now is an API that proxies and unifies different providers.
Creating new providers is straight forward ([example](https://github.com/Internet4000/media-now/blob/master/src/serializer-discogs.js)).

![](https://travis-ci.org/Internet4000/media-now.svg?branch=master)

![The Burning of the Library at Alexandria in 391 AD. Ambrose Dudley](http://i.imgur.com/2fvkbVem.jpg)

## API

Here is a hopefully self-explanatory list of endpoints. Try them!

- https://media.now.sh/youtube/YyI52_FEYgY
- https://media.now.sh/vimeo/121814744
- https://media.now.sh/discogs/1728315
- https://media.now.sh/spotify/3S2R0EVwBSAVMd5UMgKTL0
- https://media.now.sh/analyse/3S2R0EVwBSAVMd5UMgKTL0
- [https://media.now.sh/spotify-search/Michael Jackson - Thriller](https://media.now.sh/spotify-search/Michael Jackson - Thriller)

The data returned will (mostly) be formatted like so:

```js
{
	"provider": "youtube",
	"id": "YyI52_FEYgY",
	"url": "https://www.youtube.com/watch?v=YyI52_FEYgY",
	"title": "I Due Nemici",
	"thumbnail": "https://i.ytimg.com/vi/YyI52_FEYgY/default.jpg",
	"duration": 6300 // seconds,
	"status" {} // privacy info, is it embeddable etc.
}
```

## Developing

You'll need node.js and yarn (or npm) installed.

* git clone this repo and cd into it
* `yarn install`
* `yarn start`

Some requests require authentication. Copy the `.env-example` file to `.env` and replace the keys with your own. You can register (free) here:

- https://console.developers.google.com/apis/api/youtube/overview
- https://developer.vimeo.com/apps
- https://developer.spotify.com/my-applications/

## Deploying

1. `yarn deploy` (or `npm run deploy`, if you please)
2. `now alias <paste now url here> media.now.sh` (the id will be ready to paste automatically)

