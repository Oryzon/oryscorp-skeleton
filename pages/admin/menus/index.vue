<template>
    <v-row>
        <v-col md="12">
            <v-card :loading="pending">
                <v-card-title>
                    Menu management

                    <ComponentsAdminMenuAdd @updated="refresh"></ComponentsAdminMenuAdd>
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
                                        <th>Position</th>
                                        <th>Page linked</th>
                                        <th>Last update</th>
                                        <th class="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="menu in menus">
                                        <td>{{ capitalize(menu.type) }}</td>
                                        <td>{{ menu.name }}</td>
                                        <td>{{ menu.slug }}</td>
                                        <td>{{ menu.position }}</td>
                                        <td>{{ menu.pageUuid ? menu.pageUuid : 'System' }}</td>
                                        <td>{{ fDateTime(menu.updatedAt ? menu.updatedAt : menu.createdAt) }}</td>
                                        <td>
                                            <ComponentsAdminMenuDelete
                                                :menu="menu"
                                                @updated="refresh"
                                            ></ComponentsAdminMenuDelete>

                                            <ComponentsAdminMenuEdit
                                                :menu="menu"
                                                @updated="refresh"
                                            ></ComponentsAdminMenuEdit>
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
import { fDateTime, capitalize } from "~/models/AppFilter";
import ComponentsAdminMenuAdd from '@/components/admin/menu/add.vue';
import ComponentsAdminMenuDelete from '@/components/admin/menu/delete.vue';
import ComponentsAdminMenuEdit from '@/components/admin/menu/edit.vue';

definePageMeta({
    layout: "admin",
});

const { data: menus, refresh, pending } = await useFetch(`/api/admin/menu/`);
</script>
