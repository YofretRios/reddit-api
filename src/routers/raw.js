const express = require('express');
const Post = require('../models/post');
const Image = require('../models/Image');
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

/**
 * Get Top Post based on Subreddit
 * @param  {[type]} '/top' [description]
 * @param  {[type]} (req,  res           [description]
 * @return {[type]}        [description]
 */
router.get('/top', (req, res) => {
  try {
    const { query: { subreddit, count, after } } = req;
    // Call TOP api
    reddit.top({
      limit: 15,
      r: subreddit,
      count: count || 0,
      after: after || null
    }, (err, response) => {
      if (!err) {
        res.status(201).send(response);
      } else {
        res.status(500).send({ error: err });
      }
    });
  } catch (ex) {
    res.status(500).send(ex);
  }
});

/**
 * Mark Post As Read
 * @param  {Req} Request body
 * {
 *   reddi_id: '',
 *   visited: true
 * }
 */
router.post('/markAsRead', async (req, res) => {
  const post = new Post({
    reddit_id: 'test_id',
    visited: true
  });

  try {
    await post.save();

    res.status(201).send(post);
  } catch (e) {
    res.status(400).send();
  }
});

/**
 * Mark Post As Dismissed
 * @param  {Req} Request body
 * {
 *   reddi_id: '',
 *   dismissed: true
 * }
 */
router.post('/dismiss', async (req, res) => {
  const post = new Post({
    reddit_id: 'test_id',
    dismissed: true
  });

  try {
    await post.save();

    res.status(201).send(post);
  } catch (e) {
    res.status(400).send();
  }
});

/**
 * Save selected URI image
 * @param  {Req} Request body { reddit_url: '' }
 */
router.post('/image', async (req, res) => {
  const image = new Image({
    reddit_url: 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
  });

  try {
    await image.save();

    res.status(201).send(image);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
