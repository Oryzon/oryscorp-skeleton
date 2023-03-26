import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const skeletonTheme = {
    dark: false,
    colors: {
        background: '#F8F8F8',
        surface: '#FFFFFF',
        primary: '#0091EA',
        error: '#D50000',
        success: '#1B5E20',
        warning: '#E65100',
    }
}

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        theme: {
            defaultTheme: 'skeletonTheme',
            themes: {
                skeletonTheme,
            }
        }
    })

    nuxtApp.vueApp.use(vuetify)
});
