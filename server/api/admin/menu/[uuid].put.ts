import prisma from "~/prisma/client";
import { MENU_UPDATED } from "~/server/message";
import {readBody} from "h3";
import { jwtCheckerHelper } from "~/server/helper/jwt-checker.helper";

export default defineEventHandler(async (event) => {
    let user = await jwtCheckerHelper(event);
    const uuid = event.context.params?.uuid;
    const body = await readBody(event);

    let page;

    if (body.pageUuid) {
        page = {
            connect: {
                uuid: body.pageUuid
            }
        };
    }

    if (user) {
        await prisma.menu.update({
            where: {
                uuid: uuid
            },
            data: {
                name: body.name,
                slug: body.slug,
                type: body.type,
                position: body.position,
                page: page,
                createdBy: '',
                updatedBy: ''
            }
        });

        return MENU_UPDATED;
    }
});
