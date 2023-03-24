import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    const type = event.context.params?.type;

    return prisma.menu.findMany({
        where: {
            type: type
        }
    });
});

