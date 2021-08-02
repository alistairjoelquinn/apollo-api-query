import { useQuery, useMutation, gql } from '@apollo/client';

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

const SET_USER_MUTATION = gql`
    mutation updatePerson($name: String!, $job: String!) {
        updateUser(name: $name, job: $job) {
            name
            job
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
    const [updatePerson] = useMutation(SET_USER_MUTATION, { refetchQueries: [{ query: GET_USER_QUERY }] });

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log('error: ', error);
        return <p>Error</p>;
    }

    return (
        <div>
            <h1>Users Component</h1>
            {data?.users.map((item: UserDataItem) => (
                <div key={item.id}>
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
                </div>
            ))}
            <button
                type="button"
                onClick={() =>
                    updatePerson({
                        variables: {
                            name: 'Alistair',
                            job: 'Legend',
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
