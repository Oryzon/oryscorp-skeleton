import prisma from "~/prisma/client";
import { readBody } from "h3";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    return prisma.menu.create({
        data: {
            name: body.name,
            slug: body.slug,
            type: body.type,
            position: body.position,
            createdBy: '',
            updatedBy: ''
        }
    });
});
