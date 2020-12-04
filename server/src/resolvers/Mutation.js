const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

signup = async (parent, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10);

    const user = await context.prisma.user.create({
        data: {
            ...args,
            password
        }
    });

    const token = jwt.sign({
        userId: user.id
    }, APP_SECRET);

    return {
        token,
        user,
    }
}

login = async (parent, args, context, info) => {
    const user = await context.prisma.user.findUnique({where: { email: args.email }});
    if(!user) { throw new Error("No such user exists!"); }

    const valid = await bcrypt.compare(args.password, user.password);
    if(!valid) { throw new Error("Invalid password!"); }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    }
}

post = (parent, args, context, info) => {
    const userId = getUserId(context);

    const newApplication = context.prisma.application.create({
        data: {
            position: args.position,
            company: args.company,
            website: args.website,
            status: "Applied",

            postedBy: { connect: {id: userId }}
        } 
    });
    context.pubsub.publish("NEW_APPLICATION", newApplication);

    return newApplication;
}

updateInterviewRound = async (parent, args, context, info) => {
    let applicationToUpdate = await context.prisma.application.findUnique({ where: { id: args.appId }});
    if(!applicationToUpdate) { throw new Error("No such application exists!"); }

    const updateRound = (applicationToUpdate.interviewRounds === 0) 
        ? 
            await context.prisma.application.update({
                where: { id: applicationToUpdate.id },
                data: { interviewRounds: applicationToUpdate.interviewRounds + 1, status: "Interviewing", updatedAt: new Date().toISOString() }
            }) 
        :
            await context.prisma.application.update({
                where: { id: applicationToUpdate.id },
                data: { interviewRounds: applicationToUpdate.interviewRounds + 1, updatedAt: new Date().toISOString() }
            })
        ;

    context.pubsub.publish("UPDATE_INTERVIEW_ROUNDS", updateRound);

    return updateRound;
}

updateApplicationStatus = async (parent, args, context, info) => {
    let applicationToUpdate = await context.prisma.application.findUnique({ where: { id: args.appId }});
    if(!applicationToUpdate) { throw new Error("No such application exists!"); }

    const updateApplicationStatus = (args.status === "Interviewing") 
    ?
        await context.prisma.application.update({
            where: { id: applicationToUpdate.id },
            data: { status: args.status, interviewRounds: applicationToUpdate.interviewRounds + 1, updatedAt: new Date().toISOString() }
        })
    :
        await context.prisma.application.update({
            where: { id: applicationToUpdate.id },
            data: { status: args.status, updatedAt: new Date().toISOString() }
        })

    context.pubsub.publish("UPDATE_APPLICATION_STATUS", updateApplicationStatus);

    return updateApplicationStatus;
}

module.exports = {
    signup,
    login,
    post,
    updateInterviewRound,
    updateApplicationStatus,
}