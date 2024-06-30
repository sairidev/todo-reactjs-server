const userController = require('../controllers/user');
const todoController = require('../controllers/todo');

const resolvers = {
  Query: {
    // Todo
    getTodo: (_, { id }, { user }) => todoController.getTodo(id, user),
    getTodos: (_, {}, { user }) => todoController.getTodos(user),
  },

  Mutation: {
    // User
    searchUser: (_, { user }) => userController.searchUser(user),
    createUser: (_, { user }) => userController.createUser(user),

    // Todo
    createTodo: (_, { todo }, { user }) =>
      todoController.createTodo(todo, user),
    updateTodo: (_, { todo }, { user }) =>
      todoController.updateTodo(todo, user),
    deleteTodo: (_, { id }, { user }) => todoController.deleteTodo(id, user),
  },
};

module.exports = resolvers;
