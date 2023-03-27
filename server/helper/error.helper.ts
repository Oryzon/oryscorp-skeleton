import { CANT_LOGIN } from "~/server/message";

export const errorHelper = (error: any) => {
    if (error === 'LOGIN_FAILED') {
        return createError({
            statusCode: 401,
            statusMessage: CANT_LOGIN
        });
    }
}
