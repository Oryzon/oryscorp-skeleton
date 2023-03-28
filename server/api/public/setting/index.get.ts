import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    return prisma.setting.findMany();
});

