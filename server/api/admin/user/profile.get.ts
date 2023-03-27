import prisma from "~/prisma/client";
import { jwtCheckerHelper } from "~/server/helper/jwt-checker.helper";

export default defineEventHandler(async (event) => {
    let user = await jwtCheckerHelper(event);

    return {
        uuid: user?.uuid,
        username: user?.username,
        email: user?.email,
        createdAt: user?.createdAt,
    }
});
