const { getUserId } = require("../utils");

feed = async (parent, args, context, info) => {
    const userId = getUserId(context);

    const where = args.filter
    ? {
        OR: [
            { position : { contains: args.filter } },
            { company : { contains: args.filter } }
        ],
        AND: [
            {postedBy: { id: userId}}
        ]
    }
    : {postedBy: { id: userId}}

    // Apply the conditional WHERE if there's a filter, else empty WHERE returns all.
    const applications = await context.prisma.application.findMany({
        where,
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy,
    });

    const count = await context.prisma.application.count({ where });

    return {
        applications,
        count,
    };
}

module.exports = {
    feed,
}