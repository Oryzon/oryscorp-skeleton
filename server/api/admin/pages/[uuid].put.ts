import { jwtCheckerHelper } from "~/server/helper/jwt-checker.helper";
import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    let user = await jwtCheckerHelper(event);

    const uuid = event.context.params?.uuid;

    return prisma.page.findFirst({
        where: {
            uuid: uuid
        }
    });
});
