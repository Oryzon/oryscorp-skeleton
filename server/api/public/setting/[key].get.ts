import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    const key = event.context.params?.key;

    return prisma.setting.findFirst({
        where: {
            key: key
        }
    });
});

