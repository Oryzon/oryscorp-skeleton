<template>
    <v-app>
        <v-app-bar color="blue-grey-darken-4" :title="'Administration - ' + title.value"></v-app-bar>

        <v-navigation-drawer permanent>
            <v-list>
                <v-list-item
                    v-for="menu in menus"
                    :key="menu.title"
                    :title="menu.title"
                    :to="menu.to"
                >
                    <template v-slot:prepend="{item}">
                        <v-icon :color="menu.color">{{ menu.icon }}</v-icon>
                    </template>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container fluid>
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
                    {{ new Date().getFullYear() }} — <strong>Administration - {{ title.value }}</strong>
                </v-col>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script setup>
const { data: title } = await useFetch('/api/public/setting/title');
const menus = [
    {
        title: 'Dashboard',
        icon: 'mdi-view-dashboard',
        color: 'cyan-accent-3',
        to: '/admin/'
    },
    {
        title: 'Pages',
        icon: 'mdi-book-open-page-variant',
        color: 'purple-accent-4',
        to: '/admin/pages',
    },
    {
        title: 'Menus',
        icon: 'mdi-menu',
        color: 'green-darken-2',
        to: '/admin/menus',
    },
    {
        title: 'Users',
        icon: 'mdi-account-key',
        color: 'deep-orange-accent-4',
        to: '/admin/users',
    }
];
</script>
