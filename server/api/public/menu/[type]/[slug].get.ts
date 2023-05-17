import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    const type = event.context.params?.type;
    const slug = event.context.params?.slug;

    let page = await prisma.menu.findFirst({
        where: {
            type: type,
            slug: slug
        },
        include: {
            page: true
        }
    });

    let blocCms: Array<string> = [];

    page.page.content.split('<%').forEach((item) => {
        if (item.indexOf('%>') > -1) {
            blocCms.push(item.split('%>')[0]);
        }
    });

    if (blocCms.length > 0) {
        let databaseBlocCms = await prisma.BlocCMS.findMany({
            where: {
                key: {in: blocCms}
            }
        });

        if (databaseBlocCms.length > 0) {
            databaseBlocCms.forEach((bloc) => {
                page.page.content = page.page.content.split(`<%${bloc.key}%>`).join(bloc.content);
            });
        }

        blocCms.forEach((bloc) => {
            page.page.content = page.page.content.split(`<%${bloc}%>`).join('');
        })
    }

    return page;
});

