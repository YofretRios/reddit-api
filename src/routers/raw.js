const express = require('express');

const router = new express.Router();

router.get('/top', async (req, res) => {
  // TODO: Add API wrapper
  res.status(201).send({ hello: 'World' });
});

module.exports = router;
