import prisma from "~/prisma/client";
import { MENU_DELETED } from "~/server/message";
import { jwtCheckerHelper } from "~/server/helper/jwt-checker.helper";

export default defineEventHandler(async (event) => {
    let user = await jwtCheckerHelper(event);
    const uuid = event.context.params?.uuid;

    if (user) {
        await prisma.menu.delete({
            where: {
                uuid: uuid
            }
        });

        return MENU_DELETED;
    }
});
