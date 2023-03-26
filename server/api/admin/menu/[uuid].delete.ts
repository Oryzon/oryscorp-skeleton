import prisma from "~/prisma/client";
import { MENU_DELETED } from "~/server/message";

export default defineEventHandler(async (event) => {
    const uuid = event.context.params?.uuid;

    await prisma.menu.delete({
        where: {
            uuid: uuid
        }
    });

    return MENU_DELETED;
});
