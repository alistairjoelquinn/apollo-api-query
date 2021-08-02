import { ApolloServer, gql } from "apollo-server-micro";
import schema from './schema.graphql';

const users = [{
    id: 1,
    name: 'Alistair Quinn',
    email: 'al@example.com',
    age: 36,
    job: 'React Developer',
}];

const resolvers = {
    Query: {
        users: () => users,
    },
    Mutation: {
        updateUser: (parent, args) => {
            console.log('args: ', args);
            const updatePerson = people.find((item) => item.id === args.id);
            if (args.job) {
                updatePerson.job = args.job;
            }
            if (args.name) {
                updatePerson.name = args.name;
            }
            if (args.email) {
                updatePerson.email = args.email;
            }
            if (args.age) {
                updatePerson.age = args.age;
            }
            return updatePerson;
        },
    },
};

const server = new ApolloServer({ typeDefs: schema, resolvers });

const startServer = server.start()

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader(
        'Access-Control-Allow-Origin',
        'https://studio.apollographql.com'
    )
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    if (req.method === 'OPTIONS') {
        res.end()
        return false
    }

    await startServer
    await server.createHandler({
        path: '/api/graphql',
    })(req, res)
}

export const config = {
    api: {
        bodyParser: false,
    },
}
