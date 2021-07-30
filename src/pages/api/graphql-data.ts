import { MutationArgs } from '@/models/api/graphql-data';
import { ApolloServer, gql } from 'apollo-server-micro';

const book = {
    name: ' In Search of Lost Time',
    author: 'Marcel Proust',
};

const typeDefs = gql`
    type Book {
        name: String
        author: String
    }
    type Query {
        book: Book
    }
    type Mutation {
        updateBook(name: String!, author: String!): Book
    }
`;

const resolvers = {
    Query: {
        book: () => book,
    },

    Mutation: {
        updateBook: (_1: void, args: MutationArgs) => {
            book.name = args.name;
            book.author = args.author;
            return book;
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
