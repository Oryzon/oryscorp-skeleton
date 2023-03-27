import prisma from "~/prisma/client";
import { jwtCheckerHelper } from "~/server/helper/jwt-checker.helper";

export default defineEventHandler(async (event) => {
    let user = await jwtCheckerHelper(event);

    return prisma.user.findMany({
        orderBy: [
            { createdAt: 'desc' },
        ]
    });
});
