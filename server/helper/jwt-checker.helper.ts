import { H3Event } from "h3";
import { NOT_LOGGED, USER_NOT_FOUND, JWT_TOKEN_EXPIRED } from "~/server/message";
import jwt from "jsonwebtoken";
import prisma from "~/prisma/client";

export const jwtCheckerHelper = async (event: H3Event) => {
    let auth = getCookie(event, 'auth');

    if (auth === undefined) {
        throw createError({
            statusCode: 401,
            statusMessage: NOT_LOGGED
        });
    }

    try {
        let payload = jwt.verify(auth, 'ThisIsASecretKeyIDontKnowWTFItIs');

        return await prisma.user.findUniqueOrThrow({
            where: {
                // @ts-ignore
                uuid: payload.uuid
            }
        });
    } catch (err: any) {
        console.log(err);

        if (err instanceof jwt.JsonWebTokenError) {
            throw createError({
                statusCode: 401,
                statusMessage: USER_NOT_FOUND
            });
        }

        if (err instanceof jwt.TokenExpiredError) {
            throw createError({
                statusCode: 401,
                statusMessage: JWT_TOKEN_EXPIRED
            });
        }

        if (err.code === 'P2025') {
            throw createError({
                statusCode: 401,
                statusMessage: USER_NOT_FOUND
            });
        }
    }
}
