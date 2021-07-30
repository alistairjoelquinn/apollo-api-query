import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import Users from '@/components/Users';

const Home: React.FC = () => {
    const client = new ApolloClient({
        uri: 'http://localhost:3000/api/graphql',
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <div>
                <h1>Nextjs / Typescript Graphql Apollo Queries</h1>
                <Users />
            </div>
        </ApolloProvider>
    );
};

export default Home;
