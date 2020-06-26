const mongoose = require('mongoose');

const connectionURI = process.env.DATABASE_URL;

mongoose.connect(connectionURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false, // remove deprecation warning
  useUnifiedTopology: true,
  dbName: process.env.DATABASE_NAME
});
