# OryScorp Skeleton
A full skeleton of Nuxt 3 (Vue 3), Prisma, Vite configuration for HRM.
Also, Vuetify JS for Admin and Tailwind CSS for Public
Based on MySQL Database.

Some usefull command :
- Create Docker and DataBase : `docker run -p 3306:3306 --name skeleton -e MARIADB_USER=oryzon -e MARIADB_PASSWORD=oryzon -e MARIADB_DATABASE=skeleton -e MARIADB_ROOT_PASSWORD=root -d mariadb:latest`
- Install `npm install`
- Run dev `npm run dev`
- Init Prisma `npx prisma init`
- Migration of Prisma (and generate Client) `npx prisma migrate dev --name init`
- Seed the database (only the first time) : `npx prisma db seed`
- Open Prisma Studio `npx prisma studio`

Go for awesome project.

### Need some help ?
- https://www.floatui.com/components
- https://www.prisma.io/
- https://vuetifyjs.com/en/
- https://nuxt.com/
- https://vuejs.org/
