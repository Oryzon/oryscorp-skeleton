<template>
    <v-row>
        <v-col md="12">
            <v-card>
                <v-card-title>
                    Gestion des menu

                    <ComponentsAdminMenuAdd @added="addedMenu"></ComponentsAdminMenuAdd>
                </v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col md="12">
                            <v-table>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Name</th>
                                        <th>Slug</th>
                                        <th>Page linked</th>
                                        <th>Last update</th>
                                        <th class="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="menu in menus">
                                        <td>{{ menu.type }}</td>
                                        <td>{{ menu.name }}</td>
                                        <td>{{ menu.slug }}</td>
                                        <td>{{ menu.pageUuid }}</td>
                                        <td>{{ menu.createdAt }}</td>
                                        <td>

                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import ComponentsAdminMenuAdd from '@/components/admin/menu/add.vue';

definePageMeta({
    layout: "admin",
});

const { data: menus } = reactive(await useFetch(`/api/admin/menu/`));

function addedMenu(data) {
    menus.push(data);
}
</script>
