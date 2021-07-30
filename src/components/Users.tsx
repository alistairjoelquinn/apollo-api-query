import { useQuery, useMutation, gql } from '@apollo/client';

const GET_USER = gql`
    query {
        person {
            name
            job
        }
    }
`;

const SET_USER = gql`
    mutation updatePerson($name: String!, $job: String!) {
        updatePerson(name: $name, job: $job) {
            name
            job
        }
    }
`;

const Users: React.FC = () => {
    const { loading, error, data } = useQuery(GET_USER);

    const [updatePerson] = useMutation(SET_USER);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log('error: ', error);
        return <p>Error</p>;
    }

    return (
        <div>
            <h1>Users Component</h1>
            <p>
                {data.person.name} - {data.person.job}
            </p>
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
