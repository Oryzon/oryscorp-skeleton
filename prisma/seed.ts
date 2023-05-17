import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const appName = await prisma.setting.create({
        data: {
            key: 'title',
            value: 'Skeleton',
            createdBy: '',
            updatedBy: ''
        }
    });

    const canRegister = await prisma.setting.create({
        data: {
            key: 'canRegister',
            value: '1',
            createdBy: '',
            updatedBy: ''
        }
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });
