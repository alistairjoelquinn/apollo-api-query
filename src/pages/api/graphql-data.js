const { ApolloServer, gql } = require('apollo-server-micro');

const person = {
    name: 'Alistair',
    job: 'React Developer',
};

const people = [person];

const typeDefs = gql`
    type Person {
        name: String!
        job: String!
    }
    type Query {
        person: Person!
    }
    type Query {
        people(query: string): [Person!]!
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
        updateBook: (parent, args) => {
            person.name = args.name;
            person.job = args.job;
            return person;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const handler = server.createHandler({ path: '/api/graphql-data' });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
