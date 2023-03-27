import prisma from "~/prisma/client";
import { jwtCheckerHelper } from "~/server/helper/jwt-checker.helper";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
    let user = await jwtCheckerHelper(event);
    const query = getQuery(event)
    let limit = typeof query.limit === "string" ? parseInt(query.limit) : 2;
    let page = typeof query.page === "string" ? parseInt(query.page) : 1;

    return {
        count: await prisma.page.count(),
        items: await prisma.page.findMany({
            orderBy: [
                { createdAt: 'desc' },
            ]
        })
    }
});
