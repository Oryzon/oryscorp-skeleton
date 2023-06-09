import { jwtCheckerHelper } from "~/server/helper/jwt-checker.helper";
import prisma from "~/prisma/client";
import {readBody} from "h3";
import { PAGE_UPDATED } from "~/server/message";

export default defineEventHandler(async (event) => {
    let user = await jwtCheckerHelper(event);
    const uuid = event.context.params?.uuid;
    const body = await readBody(event);

    if (user) {
        await prisma.page.update({
            where: {
                uuid: uuid
            },
            data: {
                title: body.title,
                content: body.content,
                state: !!body.state,
                template: body.template,
                updatedBy: user.uuid
            }
        });

        return PAGE_UPDATED;
    }
});
