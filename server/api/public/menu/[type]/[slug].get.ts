import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    const type = event.context.params?.type;
    const slug = event.context.params?.slug;

    return prisma.menu.findFirst({
        where: {
            type: type,
            slug: slug
        },
        include: {
            page: true
        }
    });
});

