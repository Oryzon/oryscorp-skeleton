<template>
    <v-app>
        <v-app-bar color="blue-grey-darken-4" class="text-center" :title="title"></v-app-bar>

        <v-main>
            <v-container fluid>
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
import { useAuthStore } from "~/store/auth.store";
import { useRouter, useRoute } from "#app";
import { useSettingStore } from "~/store/setting.store";

export default {
    async setup() {
        if (useRoute().path !== '/admin/register') {
            await useAuthStore().refresh();
        }

        if (useAuthStore().isAuthentificated) {
            await useRouter().push({path: '/admin/'});
        }
    },
    computed: {
        title() {
            return useSettingStore().getTitle;
        }
    }
}
</script>
