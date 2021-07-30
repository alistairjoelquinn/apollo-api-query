import { useQuery, useMutation, gql } from '@apollo/client';

const GET_USERS = gql`
    query {
        people {
            name
            author
        }
    }
`;

const SET_USER = gql`
    mutation UpdatePerson($name: String!, $job: String!) {
        updatePerson(name: $name, job: $job) {
            name
            author
        }
    }
`;

const Users: React.FC = () => {
    const { loading, error, data } = useQuery(GET_USERS);

    const [updateBook] = useMutation(SET_USER);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    const updateBookDetails = () => {
        updateBook({
            variables: { name: 'A Spicy Sausage', author: 'Anton the Butcher' },
        });
    };

    return (
        <div>
            <p>
                {data.book.name} - {data.book.author}
            </p>
            <button type="button" onClick={updateBookDetails}>
                Update Book
            </button>
        </div>
    );
};

export default Users;
