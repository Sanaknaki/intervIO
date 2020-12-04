const { GraphQLServer, PubSub } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Application = require('./resolvers/Application');
const Subscription = require('./resolvers/Subscription');

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Application,
}

const prisma = new PrismaClient();
const pubsub = new PubSub();

// Bundled the Schema and Resolvers to GraphQLServer, tells server what API operations are accepted and how they are resolved!
const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
            pubsub, 
        }
    },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));