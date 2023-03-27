import prisma from "~/prisma/client";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { readBody } from "h3";
import { CANT_REGISTER } from "~/server/message";
import { errorHelper } from "~/server/helper/error.helper";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        let user = await prisma.user.findFirst({
            where: {
                username: body.username
            }
        });

        if (user && bcrypt.compareSync(body.password, user.password)) {
            // We can create the token !
            return {
                token:
                    jwt.sign(
                    {
                        uuid: user.uuid,
                        username: user.username,
                    },
                    'ThisIsASecretKeyIDontKnowWTFItIs',
                    {
                        expiresIn: "4h"
                    }
                )
            };
        } else {
            return errorHelper('LOGIN_FAILED');
        }
    } catch (err) {
        return errorHelper(err);
    }
});
