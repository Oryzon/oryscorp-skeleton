import { jwtCheckerHelper } from "~/server/helper/jwt-checker.helper";
import prisma from "~/prisma/client";
import {readBody} from "h3";
import { BLOC_CMS_UPDATED } from "~/server/message";

export default defineEventHandler(async (event) => {
    let user = await jwtCheckerHelper(event);
    const uuid = event.context.params?.uuid;
    const body = await readBody(event);

    if (user) {
        await prisma.BlocCMS.update({
            where: {
                uuid: uuid
            },
            data: {
                title: body.title,
                content: body.content,
                key: body.key,
                updatedBy: user.uuid
            }
        });

        return BLOC_CMS_UPDATED;
    }
});
