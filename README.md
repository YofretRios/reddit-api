# Reddit Api

Small api that uses a Reddit Api Wrapper to get data from Reddit, it contains a small set endpoints to query data, save and delete.

### Live REST api
This API is currently deployed using heorku cloud [here](https://reddit-tops-api.herokuapp.com/), it only works as REST api it will not show anything on the browser, to test it please use postman or a similar tool.

## Installing
Using npm:

```bash
$ npm install
```

Using yarn:

```bash
$ yarn add
```

### Run command
```bash
$ yarn dev
```

```bash
$ npm run dev
```

### Lints and fixes files
```bash
$ yarn lint
```

```bash
$ npm run lint
```

### Docker Set up
This api requires mongodb to be running on the local machine, I've included a small docker image that initiates an instace of mongodb without having to install it globally.

to start the docker container in the background just run the following command:

```bash
docker-compose up -d
```

this requires docker to be installed, this setup optional thought, you can always chose to install a mongodb directly, skiping this setup.

## Leverage
For this project I've used the following libraries to solve common problems
- cors ^2.8.5
- dotenv ^8.2.0
- express ^4.17.1
- mongoose ^5.9.20
- raw.js ^0.6.0

## Endpoints

### GET /top
Returns the current top post from an specified subreddit

```
query params
subreddit, count, after, limit
```

### POST /markAsRead
Marks a post as read

```javasctip
{
  reddit_id: 'id',
  visited: true
}
```

### POST /dismiss
Marks a post as dimissed

```javasctip
{
  reddit_id: 'id',
  dismissed: true
}
```

### POST /dismissAll
Marks an array of post as dimissed

```javasctip
{
  ids: ['id1', 'id2', 'id3']
}
```

### GET /image
Get all saved images

### POST /image
Save an image URL

```
{ reddit_url: '' }
```

### DELETE /image
Delete Image By ID

```
{ id: '' }
```
