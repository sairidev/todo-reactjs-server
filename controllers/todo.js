const { Todo } = require('../db/Schemas');
const userTools = require('../utils/auth');

const getTodos = async (user) => {
  try {
    if (user) {
      const todos = await Todo.find({ userID: user.payload.id });

      if (!todos) {
        return [];
      }

      return todos;
    } else {
      throw new Error('Unauthorized access');
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const createTodo = async (todo, user) => {
  try {
    const newTodo = new Todo({ ...todo });

    if (todo.userID === user.payload.id) {
      await newTodo.save();

      return { success: true };
    } else {
      throw new Error('Unauthorized access');
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const getTodo = async (id, user) => {
  try {
    if (user && id) {
      const todo = Todo.findOne({ _id: id, userID: user.payload.id });

      if (!todo) {
        return [];
      }

      return todo;
    } else {
      throw new Error('Unauthorized access');
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const updateTodo = async (todo, user) => {
  try {
    if (user.payload.id) {
      await Todo.findByIdAndUpdate(
        { _id: todo.id },
        { ...todo },
        { new: true }
      );
      return { success: true, id: todo.id };
    } else {
      throw new Error('Unauthorized access');
    }
  } catch (error) {
    console.error(error.nessage);
    throw error;
  }
};

const deleteTodo = async (id, user) => {
  try {
    if (user && id) {
      const todo = await Todo.findOne({ _id: id, userID: user.payload.id });

      if (todo) {
        await Todo.findByIdAndDelete({ _id: todo.id });
        return { success: true, id };
      } else {
        return { success: false };
      }
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

module.exports = {
  getTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
