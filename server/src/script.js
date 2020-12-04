const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

    // Post a new application
    // const newApplication = await prisma.application.create({
    //     data: {
    //         position: "Back End Developer",
    //         company: "Google",
    //         status: "Open"
    //     },
    // });

    const allApplications = await prisma.application.findMany();

    console.log(allApplications);
}

main()
    .catch( e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect
    });