import prisma from "~/prisma/client";
import { jwtCheckerHelper } from "~/server/helper/jwt-checker.helper";
import { readBody } from "h3";
import { SETTING_SAVED } from "~/server/message";

export default defineEventHandler(async (event) => {
    let user = await jwtCheckerHelper(event);
    const body = await readBody(event);

    if (user) {
        let settings = await prisma.setting.findMany();

        for (let setting of settings) {
            if (setting.key === 'title' && setting.value !== body.title) {
                setting.value = body.title;
                setting.updatedBy = user.uuid;
            }

            if (setting.key === 'canRegister' && setting.value !== body.canRegister) {
                setting.value = body.canRegister;
                setting.updatedBy = user.uuid;
            }

            await prisma.setting.update({
                where: {
                    uuid: setting.uuid
                },
                data: setting
            })
        }

        return SETTING_SAVED;
    }
});
