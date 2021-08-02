import { ApolloServer, gql } from "apollo-server-micro";

const person = {
    name: 'Alistair',
    job: 'React Developer',
};

const people = [person];

const resolvers = {
    Query: {
        person: () => person,
        people: () => people,
    },

    Mutation: {
        updatePerson: (parent, { name, job }) => {
            console.log('name, job: ', name, job);
            const updatePerson = people.find((item) => item.name === name);
            updatePerson.job = job;
            return updatePerson;
        },
    },
};

const server = new ApolloServer({ typeDefs: './schema.graphql', resolvers });

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
