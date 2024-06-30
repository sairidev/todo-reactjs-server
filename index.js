const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const { decodeToken } = require('./utils/auth');
require('./db');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const token = req.headers.authorization || '';

    try {
      if (token) {
        const user = decodeToken(token.replace('Bearer ', ''));
        return { user };
      }
      return null;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  },
}).then(({ url }) => console.log(`Server ready at: ${url}`));
