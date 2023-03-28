// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        'vuetify/lib/styles/main.css',
        '@mdi/font/css/materialdesignicons.min.css',
    ],
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        server: {
            watch: {
                usePolling: true
            }
        }
    },
    watchers: {
        webpack: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },
    modules: [
        '@pinia/nuxt',
    ],
})
