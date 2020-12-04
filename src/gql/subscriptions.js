import gql from 'graphql-tag';

const NEW_APPLICATIONS_SUBSCRIPTION = gql`
    subscription {
        newApplication {
            id
            position
            company
            website
            status
            interviewRounds
            createdAt
            updatedAt
            postedBy {
                id
                name
            }
        }
    }
`;

const UPDATED_INTERVIEWROUND_SUBSCRIPTION = gql`
    subscription {
        updateInterviewRound {
            id
            position
            company
            website
            status
            interviewRounds
            createdAt
            updatedAt
            postedBy {
                id
                name
            }
        }
    }
`;

const UPDATED_APPLICATIONSTATUS_SUBSCRIPTION = gql`
    subscription {
        updateApplicationStatus {
            id
            position
            company
            website
            status
            interviewRounds
            createdAt
            updatedAt
            postedBy {
                id
                name
            }
        }
    }
`;


export {
    NEW_APPLICATIONS_SUBSCRIPTION,
    UPDATED_INTERVIEWROUND_SUBSCRIPTION,
    UPDATED_APPLICATIONSTATUS_SUBSCRIPTION,
}