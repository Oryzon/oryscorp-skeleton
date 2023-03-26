import prisma from "~/prisma/client";
import { readBody } from "h3";
import { MENU_ADDED } from "~/server/message";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let page;

    if (body.pageUuid) {
        page = {
            connect: {
                uuid: body.pageUuid
            }
        };
    }

    await prisma.menu.create({
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

    return MENU_ADDED;
});
