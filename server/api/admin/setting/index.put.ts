import prisma from "~/prisma/client";
import { jwtCheckerHelper } from "~/server/helper/jwt-checker.helper";
import { readBody } from "h3";
import { SETTING_SAVED } from "~/server/message";

export default defineEventHandler(async (event) => {
    let user = await jwtCheckerHelper(event);
    const body = await readBody(event);

    if (user) {
        let settings = await prisma.setting.findMany();

        settings = settings.map((setting) => {
            if (setting.key === 'title') {
                setting.value = body.title;
                setting.updatedBy = user.uuid;
            }

            if (setting.key === 'canRegister') {
                setting.value = body.canRegister;
                setting.updatedBy = user.uuid;
            }

            return setting;
        });

        await prisma.setting.updateMany({
            data: settings
        });

        return SETTING_SAVED;
    }
});
