import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { resolvers } from '../../graphql/resolvers';
import { typeDefs } from '../../graphql/schema';
import dbConnect from '../../lib/mongodb';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export default startServerAndCreateNextHandler(server, {
    context: async () => {
        await dbConnect();
        return {};
    },
});
