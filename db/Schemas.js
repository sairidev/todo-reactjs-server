const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*----- User -----*/
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

/*----- Todo -----*/
const todoSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  comment: { type: String },
  completed: { type: Boolean, required: true },
});

const Todo = mongoose.model('Todo', todoSchema);

/*----- Exports -----*/
module.exports = { User, Todo };
