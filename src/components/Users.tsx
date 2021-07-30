import { useQuery, useMutation, gql } from '@apollo/client';

const GET_USERS = gql`
    query {
        people {
            name
            job
        }
    }
`;

const SET_USER = gql`
    mutation UpdatePerson($name: String!, $job: String!) {
        updatePerson(name: $name, job: $job) {
            name
            job
        }
    }
`;

const Users: React.FC = () => {
    const { loading, error, data } = useQuery(GET_USERS);

    const [updatePerson] = useMutation(SET_USER);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <div>
            <p>
                {data.person.name} - {data.person.job}
            </p>
            <button
                type="button"
                onClick={() =>
                    updatePerson({
                        variables: {
                            person: 'Alistair',
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
