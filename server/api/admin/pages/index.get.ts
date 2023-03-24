import prisma from "~/prisma/client";

export default defineEventHandler(async () => {
    return prisma.page.findMany({
        orderBy: [
            { createdAt: 'desc' },
        ]
    });
});
