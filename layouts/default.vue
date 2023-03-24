<template>
    <v-app>
        <v-app-bar :title="title.value">
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
                <v-col md="12" class="mb-4">
                    <v-divider></v-divider>
                </v-col>

                <v-col class="text-center mb-2">
                    {{ new Date().getFullYear() }} — <strong>{{ title.value }}</strong>
                </v-col>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script setup>
const { data: title } = await useFetch('/api/public/setting/title');
const { data: headers } = await useFetch('/api/public/menu/header');
</script>
