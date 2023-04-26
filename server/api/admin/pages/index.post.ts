import prisma from "~/prisma/client";
import { readBody } from "h3";
import { PAGE_ADDED } from "~/server/message";
import { jwtCheckerHelper } from "~/server/helper/jwt-checker.helper";

export default defineEventHandler(async (event) => {
    let user = await jwtCheckerHelper(event);
    const body = await readBody(event);

    if (user) {
        await prisma.page.create({
            data: {
                title: body.title,
                content: body.content,
                state: !!body.state,
                template: body.template,
                createdBy: user.uuid,
            }
        });

        return PAGE_ADDED;
    }
});
