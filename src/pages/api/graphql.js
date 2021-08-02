import { ApolloServer, gql } from "apollo-server-micro";
import schema from './schema.graphql';

const users = [{
    id: '1d',
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
            const updatePerson = users.find((item) => item.id === args.id);
            if (typeof args.data.job === 'string') {
                updatePerson.job = args.data.job;
            }
            if (typeof args.data.name === 'string') {
                updatePerson.name = args.data.name;
            }
            if (typeof args.data.email === 'string') {
                updatePerson.email = args.data.email;
            }
            if (typeof args.data.age !== undefined) {
                updatePerson.age = args.data.age;
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
