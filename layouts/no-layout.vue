<template>
    <v-app>
        <v-app-bar color="blue-grey-darken-4" class="text-center" :title="title.value"></v-app-bar>

        <v-main>
            <v-container fluid>
                <NuxtPage>
                </NuxtPage>
            </v-container>
        </v-main>

        <v-footer app>
            <v-row justify="center" no-gutters>


                <v-col class="text-center mb-2 mt-2">
                    {{ new Date().getFullYear() }} — <strong>{{ title.value }}</strong>
                </v-col>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script setup>
const { data: title } = await useFetch('/api/public/setting/title');
</script>
