import gql from 'graphql-tag';

const UPDATE_APPLICATIONSTATUS_MUTATION = gql`
    mutation UpdateMutation($appId: Int!, $status: String!) {
        updateApplicationStatus(appId: $appId, status: $status) {
            id
            createdAt
            updatedAt
            position
            company
            website
            status
            interviewRounds
        }
    }
`;

const UPDATE_INTERVIEWROUND_MUTATION = gql`
    mutation UpdateMutation($appId: Int!) {
        updateInterviewRound(appId: $appId) {
            id
            createdAt
            updatedAt
            position
            company
            website
            status
            interviewRounds
        }
    }
`;

const SIGNUP_MUTATION = gql`
    mutation SignupMutation($email: String!, $password: String!, $name: String!) {
        signup(email: $email, password: $password, name: $name) {
            token
        }
    }
`;

const LOGIN_MUTATION  = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

export {
    UPDATE_APPLICATIONSTATUS_MUTATION,
    UPDATE_INTERVIEWROUND_MUTATION,
    SIGNUP_MUTATION,
    LOGIN_MUTATION,
}