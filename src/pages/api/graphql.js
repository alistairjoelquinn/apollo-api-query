import { ApolloServer, gql } from "apollo-server-micro";

const person = {
    name: 'Alistair',
    job: 'React Developer',
};

const people = [person];
// const url = 'http://localhost:3000/api/graphql-data';

const typeDefs = gql`
    type Person {
        name: String!
        job: String!
    }
    type Query {
        person: Person!
        people(query: String!): [Person!]!
    }
    type Mutation {
        updatePerson(name: String!, job: String!): Person!
    }
`;

const resolvers = {
    Query: {
        person: () => person,
        people: () => people,
    },

    Mutation: {
        updatePerson: (parent, { name, job }) => {
            const updatePerson = people.find((item) => item.name === name);
            updatePerson.job = job;
            return updatePerson;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

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
