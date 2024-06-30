const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_DB || 'mongodb://localhost:27017/todo-reactjs';

mongoose.connect(uri);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Successful connection');
});

connection.on('error', (err) => {
  console.error('Could not connect to db', err);
  process.exit(1);
});
