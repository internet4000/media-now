# Media now

Get handy information from YouTube and Vimeo videos as well as Discogs releases through this micro service. Easier than communicating and finding the right data from the different providers yourself.

## Usage

- https://media.now.sh/youtube/YyI52_FEYgY
- https://media.now.sh/vimeo/121814744
- https://media.now.sh/discogs/1728315
- https://media.now.sh/spotify/3S2R0EVwBSAVMd5UMgKTL0
- [https://media.now.sh/spotify/search/Michael Jackson - Thriller](https://media.now.sh/spotify/search/Michael Jackson - Thriller)
- https://media.now.sh/analyse/3S2R0EVwBSAVMd5UMgKTL0

The data returned will (mostly) be formatted like so:

```js
{
	"provider": "youtube",
	"id": "YyI52_FEYgY",
	"url": "https://www.youtube.com/watch?v=YyI52_FEYgY",
	"title": "I Due Nemici",
	"thumbnail": "https://i.ytimg.com/vi/YyI52_FEYgY/default.jpg",
	"duration": 6300 // seconds
}
```

## Developing

You'll need node and yarn (or npm) installed.

* git clone this repo and cd into it
* `yarn install`
* `yarn start`

It won't be able to make any requests before the required API keys are defined in an `.env` file. You'll have to create the file yourself and register for API keys as well.

```
YOUTUBE_KEY=123
VIMEO_KEY="Bearer 123"
```

## Deploying

1. `yarn deploy` (or npm run deploy, if you please)
2. `now alias insert-now-id-from-above-deploy-here media.now.sh` (the id will be ready to paste automatically)
