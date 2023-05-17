<template>
    <v-app v-if="isAuthentificated">
        <v-app-bar color="blue-grey-darken-4" :title="'Administration - ' + title">
            <template v-slot:append>
                {{ user?.username }}

                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    location="start"
                >
                    <template v-slot:activator="{ props }">
                        <v-btn
                            v-bind="props"
                            icon="mdi-dots-vertical"
                        >
                        </v-btn>
                    </template>

                    <v-card min-width="400">
                        <v-list>
                            <v-list-item active-color="error" @click="logout">
                                <template v-slot:prepend>
                                    <v-icon color="error">mdi-logout</v-icon>
                                </template>

                                <v-list-item-title>Logout</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
            </template>
        </v-app-bar>

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
                <v-col class="text-center mb-2 mt-2">
                    {{ new Date().getFullYear() }} — <strong>Administration - {{ title }}</strong>
                </v-col>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script>
import { useAuthStore } from "~/store/auth.store";
import { useSettingStore } from "~/store/setting.store";

export default {
    setup() {
        useAuthStore().refresh();
    },
    data() {
        return {
            menus: [
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
                    title: 'Blocs CMS',
                    icon: 'mdi-content-copy',
                    color: 'deep-orange-accent-4',
                    to: '/admin/bloc-cms',
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
                },
                {
                    title: 'Settings',
                    icon: 'mdi-cog',
                    color: 'teal-darken-1',
                    to: '/admin/settings'
                }
            ],
            menu: false,
        }
    },
    methods: {
        logout() {
            useAuthStore().logout();
        }
    },
    computed: {
        isAuthentificated() {
            return useAuthStore().isAuthentificated;
        },
        user() {
            return useAuthStore().getUser;
        },
        title() {
            return useSettingStore().getTitle;
        }
    }
}
</script>
