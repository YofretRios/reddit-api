require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Connect to the DB
require('./db/mongoose');

const rawRouter = require('./routers/raw');
const galleryRouter = require('./routers/gallery');

const app = express();
const port = process.env.PORT || 3030;

// Parse all incoming request to JSON format and cors
app.use(cors());
app.use(express.json());
// Add Routers
app.use(rawRouter);
app.use(galleryRouter);

app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`); // eslint-disable-line
});
