import { GraphQLServer } from 'graphql-yoga';

import resolvers from './resolvers';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: ({ request, response }) => ({
    req: request,
    res: response
  })
});

export default server;
