import { Person } from '@/models/api/graphql-data';
import { ApolloServer, gql } from 'apollo-server-micro';

const person: Person = {
    name: 'Alistair',
    job: 'React Developer',
};

const people: Person[] = [person];

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
        updateBook: (_1: void, args: Person) => {
            person.name = args.name;
            person.job = args.job;
            return person;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.start();

const handler = server.createHandler({ path: '/api/graphql-data' });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
