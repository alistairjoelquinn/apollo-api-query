import { useQuery, useMutation, gql } from '@apollo/client';
import styled from 'styled-components';

const SingleUserStyles = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid black;
    width: 30vw;
    p {
        margin: 0;
    }
`;

const GET_USER_QUERY = gql`
    query {
        users {
            id
            name
            job
            age
            email
        }
    }
`;

const UPDATE_USER_MUTATION = gql`
    mutation updateUser($name: String!, $job: String!) {
        updateUser(name: $name, job: $job) {
            id
            name
            job
            age
            email
        }
    }
`;

interface UserDataItem {
    id: number;
    name: string;
    email: string;
    age: number;
    job: string;
}

const Users: React.FC = () => {
    const { loading, error, data } = useQuery(GET_USER_QUERY);
    if (data) {
        console.log('data: ', data);
    }
    const [updateUser] = useMutation(UPDATE_USER_MUTATION, { refetchQueries: [{ query: GET_USER_QUERY }] });

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log('error: ', error);
        return <p>Error</p>;
    }

    return (
        <div>
            <h1>Users Component</h1>
            {data?.users.map((item: UserDataItem) => (
                <SingleUserStyles key={item.id}>
                    <p>
                        <span>Name: </span>
                        <span>{item.name}</span>
                    </p>
                    <p>
                        <span>Job: </span>
                        <span>{item.job}</span>
                    </p>
                    <p>
                        <span>Age: </span>
                        <span>{item.age}</span>
                    </p>
                </SingleUserStyles>
            ))}
            <button
                type="button"
                onClick={() =>
                    updateUser({
                        variables: {
                            id: 1,
                            data: {
                                name: 'Alistair The Great',
                                job: 'Legend',
                                email: 'al@me',
                                age: 34,
                            },
                        },
                    })
                }
            >
                Update Person
            </button>
        </div>
    );
};

export default Users;
