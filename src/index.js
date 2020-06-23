require('dotenv').config();
const express = require('express');
const cors = require('cors');

const rawRouter = require('./routers/raw');

const app = express();
const port = process.env.PORT || 3030;

// Parse all incoming request to JSON format and cors
app.use(cors());
app.use(express.json());
// Add Routers
app.use(rawRouter);

app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`); // eslint-disable-line
});
