import prisma from "~/prisma/client";

export default defineEventHandler(async () => {
    return prisma.menu.findMany({
        orderBy: [
            { type: 'desc' },
            { position: 'asc' }
        ]
    });
});
