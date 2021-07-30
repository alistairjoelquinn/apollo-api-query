import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';

const Home = ({ data }) => {
    const client = new ApolloClient({
        uri: 'http://localhost:3000/api/graphql-data',
    });

    return (
        <ApolloProvider client={client}>
            <div>
                <h1>NextJS GraphQL Apollo App</h1>
            </div>
        </ApolloProvider>
    );
};

export default Home;
