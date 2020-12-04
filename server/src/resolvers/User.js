applications = (parent, args, context) => {
    return context.prisma.user.findOne({ where: { id: parent.id } }).applications();
}

module.exports = {
    applications,
}