const express = require('express');
// Import Reddit Api Wrapper
const rawjs = require('raw.js');
const reddit = new rawjs('Reddit instance');

const router = new express.Router();
// Oauth2 Authentication to the RAW
const {
  REDDIT_APP_ID,
  REDDIT_SECRET,
  REDDIT_REDIRECT_URL
} = process.env;

reddit.setupOAuth2(REDDIT_APP_ID, REDDIT_SECRET, REDDIT_REDIRECT_URL);

router.get('/top', async (req, res) => {
  // console.log(req);
  // Call TOP api
  reddit.top({
    limit: 15,
    r: 'Warzone',
    count: 0
  }, (err, response) => {
    if (!err) {
      res.status(201).send(response);
    } else {
      res.status(500).send({ error: err });
    }
  });
});

module.exports = router;
