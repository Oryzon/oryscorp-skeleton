import { jwtCheckerHelper } from "~/server/helper/jwt-checker.helper";
import { readBody } from "h3";
import prisma from "~/prisma/client";
import {PAGE_DELETED} from "~/server/message";

export default defineEventHandler(async (event) => {
    let user = await jwtCheckerHelper(event);

    const uuid = event.context.params?.uuid;

    if (user) {
        let page = await prisma.page.findUnique({
            where: {
                uuid: uuid
            }
        });

        let menus = await prisma.menu.findMany({
            where: {
                pageUuid: uuid
            }
        });

        for (let menu of menus) {
            await prisma.menu.update({
                where: {
                    uuid: menu.uuid
                },
                data: {
                    page: undefined,
                    updatedBy: user.uuid,
                    state: false
                }
            })
        }

        await prisma.page.delete({
            where: {
                uuid: uuid
            }
        });

        return PAGE_DELETED;
    }
});
