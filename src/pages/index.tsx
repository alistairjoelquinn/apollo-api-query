import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

interface Props {
    data: any;
}

const Home: React.FC<Props> = ({ data }) => {
    console.log('data: ', data);

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
