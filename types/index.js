const typeDefs = `
#user
  input UserInput {
    username: String!
    password: String!
  }

  type Token {
    token: String!
  }
 
  type Mutation {
    searchUser(user: UserInput): Token
    createUser(user: UserInput): Token
  }

#todo
  input TodoInput {
    id:ID
    userID:String
    title: String!
    comment: String
    completed: Boolean!
  }

  type Todo {
    id: ID!
    title: String!
    comment: String!
    completed: Boolean!
  }

  type Success {
    id: ID
    success: Boolean
  }

  type Query {
    getTodo(id: ID): Todo
    getTodos: [Todo]
  }

  type Mutation {
    createTodo(todo: TodoInput): Success
    updateTodo(todo: TodoInput): Success
    deleteTodo(id: ID): Success
  }
`;

module.exports = typeDefs;
