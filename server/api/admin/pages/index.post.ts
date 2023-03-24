import prisma from "~/prisma/client";
import { readBody } from "h3";
import { PAGE_ADDED } from "~/server/message";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    await prisma.page.create({
        data: {
            title: body.title,
            content: body.content,
            state: !!body.state,
            createdBy: '',
            updatedBy: ''
        }
    });

    return PAGE_ADDED;
});
