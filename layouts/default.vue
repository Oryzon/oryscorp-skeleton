<template>
    <v-app>
        <v-app-bar :title="title">
            <v-spacer></v-spacer>

            <v-btn v-for="menu in headers" :to="menu.slug">
                {{ menu.name }}
            </v-btn>
        </v-app-bar>

        <v-main>
            <v-container>
                <NuxtPage>
                </NuxtPage>
            </v-container>
        </v-main>

        <v-footer app>
            <v-row justify="center" no-gutters>
                <v-col class="text-center mb-2 mt-2">
                    {{ new Date().getFullYear() }} — <strong>{{ title }}</strong>
                </v-col>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script>
import { useSettingStore } from "~/store/setting.store";

export default {
    setup() {
        const { data: headers } = useFetch('/api/public/menu/header');

        return {
            headers
        }
    },
    computed: {
        title() {
            return useSettingStore().getTitle;
        }
    }
}
</script>
