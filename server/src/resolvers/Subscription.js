newApplicationSubscribe = (parent, args, context, info) => {
    return context.pubsub.asyncIterator("NEW_APPLICATION");
}

updateInterviewRoundSubscribe = (parent, args, context, info) => {
    return context.pubsub.asyncIterator("UPDATE_INTERVIEW_ROUNDS");
}

updateApplicationStatusSubscribe = (parent, args, context, info) => {
    return context.pubsub.asyncIterator("UPDATE_APPLICATION_STATUS");
}

const newApplication = {
    subscribe: newApplicationSubscribe,
    resolve: payload => {
        return payload
    },
}

const updateInterviewRound = {
    subscribe: updateInterviewRoundSubscribe,
    resolve: payload => {
        return payload
    },
}

const updateApplicationStatus = {
    subscribe: updateApplicationStatusSubscribe,
    resolve: payload => {
        return payload
    },
}

module.exports = {
    newApplication,
    updateInterviewRound,
    updateApplicationStatus
}