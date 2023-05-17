import prisma from "~/prisma/client";
import { readBody } from "h3";
import { BLOC_CMS_ADDED } from "~/server/message";
import { jwtCheckerHelper } from "~/server/helper/jwt-checker.helper";

export default defineEventHandler(async (event) => {
    let user = await jwtCheckerHelper(event);
    const body = await readBody(event);

    if (user) {
        await prisma.BlocCMS.create({
            data: {
                title: body.title,
                content: body.content,
                key: body.key,
                createdBy: user.uuid,
            }
        });

        return BLOC_CMS_ADDED;
    }
});
