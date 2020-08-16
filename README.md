# Media Now

Get media information from YouTube and Vimeo videos, Spotify tracks and Discogs releases.

Media Now is an API that proxies and unifies different providers.
Creating new providers is straight forward ([example](https://github.com/internet4000/media-now/blob/master/src/serializer-discogs.js)).

![](https://travis-ci.org/Internet4000/media-now.svg?branch=master)

![The Burning of the Library at Alexandria in 391 AD. Ambrose Dudley](http://i.imgur.com/2fvkbVem.jpg)

## API

Here is a hopefully self-explanatory list of endpoints. Try them!

- /youtube/YyI52_FEYgY
- /vimeo/121814744
- /discogs/1728315
- /spotify/3S2R0EVwBSAVMd5UMgKTL0
- /analyse/3S2R0EVwBSAVMd5UMgKTL0
- /spotify-search/Michael%20Jackson%20-%20Thriller

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

This used to be deployed to media.now.sh, but it no longer is. Deploying to Heroku works.

