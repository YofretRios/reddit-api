const express = require('express');
const Post = require('../models/post');
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
 */
router.get('/top', async (req, res) => {
  try {
    const { query: { subreddit, count, after, limit } } = req;
    // Fetch Tracked post for V
    const posts = await Post.find();
    // Call TOP api
    reddit.top({
      limit,
      r: subreddit,
      count: count || 0,
      after: after || null
    }, (err, response) => {
      if (!err) {
        // Map visited information
        const data = {
          ...response,
          children: response.children.map((child) => {
            let data = { ...child.data };
            let track = posts.find((post) => post.reddit_id === child.data.id);

            if (track) {
              data.visited = track.visited;
              data.dismissed = track.dismissed;
            }

            return { ...child, data };
          })
        };

        res.status(201).send(data);
      } else {
        res.status(500).send({ error: err });
      }
    });
  } catch (ex) {
    res.status(500).send({ error: ex });
  }
});

/**
 * Mark Post As Read
 * @param  {Req} Request body
 * {
 *   reddit_id: '',
 *   visited: true
 * }
 */
router.post('/markAsRead', async (req, res) => {
  const { body } = req;

  const filter = { reddit_id: body.reddit_id };
  const update = {
    ...body,
    visited: true
  };

  try {
    // Upsert action, if ID is already been tracked, them just update the value
    const post = await Post.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true
    });

    res.status(201).send(post);
  } catch (ex) {
    res.status(400).send({ error: ex.message });
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
  const { body } = req;

  const filter = { reddit_id: body.reddit_id };
  const update = {
    ...body,
    dismissed: true
  };

  try {
    // Upsert action, if ID is already been tracked, them just update the value
    const post = await Post.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true
    });

    res.status(201).send(post);
  } catch (ex) {
    res.status(400).send({ error: ex.message });
  }
});

module.exports = router;
