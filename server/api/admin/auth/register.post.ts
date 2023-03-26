import prisma from "~/prisma/client";
import bcrypt from "bcrypt";
import { CANT_REGISTER, REGISTER_OK } from "~/server/message";
import { readBody } from "h3";

export default defineEventHandler(async (event) => {
    const canRegister = await prisma.setting.findFirst({
        where: {
            key: 'canRegister',
        }
    });

    if (canRegister?.value === '1') {
        const body = await readBody(event);
        const password = bcrypt.hashSync(body.password, 8);

        await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: password
            }
        })

        return REGISTER_OK;
    } else {
        throw createError({
            statusCode: 401,
            statusMessage: CANT_REGISTER,
        });
    }
});
