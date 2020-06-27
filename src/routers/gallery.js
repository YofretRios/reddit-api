const express = require('express');
const Image = require('../models/Image');

const router = new express.Router();

/**
 * get all saved images
 */
router.get('/image', async(req, res) => {
  try {
    const images = await Image.find();

    res.status(201).send(images);
  } catch (ex) {
    res.status(400).send({ error: ex.message });
  }
});

/**
 * Save selected URI image
 * @param  {Req} Request body { reddit_url: '' }
 */
router.post('/image', async (req, res) => {
  const { body } = req;

  const filter = { reddit_url: body.reddit_url };
  const update = { ...body };

  try {
    const image = await Image.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true
    });

    res.status(201).send(image);
  } catch (ex) {
    res.status(400).send({ error: ex.message });
  }
});

/**
 * Save selected URI image
 * @param  {Req} Request body { id: '' }
 */
router.delete('/image', async (req, res) => {
  try {
    const { body } = req;

    const image = await Image.findByIdAndRemove(body.id);

    res.status(201).send(image);
  } catch (ex) {
    res.status(400).send({ error: ex.message });
  }
});

module.exports = router;
