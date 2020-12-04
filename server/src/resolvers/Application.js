postedBy = (parent, args, context) => {
    return context.prisma.application.findUnique({ where: { id: parent.id } }).postedBy();
}

module.exports = {
    postedBy,
}