<template>
    <v-row>
        <v-col md="12">
            <v-card :loading="pending">
                <v-card-title>
                    Menu management

                    <ComponentsAdminMenuAdd @updated="getInit"></ComponentsAdminMenuAdd>
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
                                        <th>State</th>
                                        <th>Last update</th>
                                        <th class="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="items.length === 0 && pending">
                                        <td colspan="8" class="text-center">Loading data...</td>
                                    </tr>

                                    <tr v-else-if="items.length === 0">
                                        <td colspan="8" class="text-center">There is no data.</td>
                                    </tr>

                                    <tr v-for="menu in items">
                                        <td>{{ capitalize(menu.type) }}</td>
                                        <td>{{ menu.name }}</td>
                                        <td>{{ menu.slug }}</td>
                                        <td>{{ menu.position }}</td>
                                        <td>{{ menu.pageUuid ? menu.pageUuid : 'System' }}</td>
                                        <td>
                                            <span v-if="menu.state"><v-icon color="success">mdi-check</v-icon></span>
                                            <span v-else><v-icon color="error">mdi-close</v-icon></span>
                                        </td>
                                        <td>{{ fDateTime(menu.updatedAt ? menu.updatedAt : menu.createdAt) }}</td>
                                        <td>
                                            <ComponentsAdminMenuDelete
                                                :menu="menu"
                                                @updated="getInit"
                                            ></ComponentsAdminMenuDelete>

                                            <ComponentsAdminMenuEdit
                                                :menu="menu"
                                                @updated="getInit"
                                            ></ComponentsAdminMenuEdit>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>

                    <ComponentsAdminTablePagination
                        v-model:page="page"
                        v-model:limit="limit"
                        :length="count"
                        label="menu(s)"
                    ></ComponentsAdminTablePagination>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { fDateTime, capitalize } from "~/models/AppFilter";
import ComponentsAdminMenuAdd from '@/components/admin/menu/add.vue';
import ComponentsAdminMenuEdit from '@/components/admin/menu/edit.vue';
import ComponentsAdminMenuDelete from '@/components/admin/menu/delete.vue';
import ComponentsAdminTablePagination from '@/components/admin/table/pagination.vue';
import { useAdminTitle } from "~/composables/useAdminTitle";

useAdminTitle('Menus management');
</script>

<script>
import axios from "axios";
import { useErrorStore } from "~/store/error.store";

export default {
    setup() {
        definePageMeta({
            layout: "admin",
        });
    },
    data() {
        return {
            page: 1,
            limit: 20,
            pending: false,
            items: [],
            count: 0,
        }
    },
    async mounted() {
        await this.getInit();
    },
    methods: {
        async getInit() {
            this.pending = true;

            await axios.get(`/api/admin/menu?page=${this.page}&limit=${this.limit}`).then((res) => {
                this.items = res.data.items;
                this.count = res.data.count;
            }).catch(async (err) => {
                await useErrorStore().handle(err);
            }).finally(() => {
                this.pending = false;
            });
        }
    },
    watch: {
        async page(newVal) {
            this.page = newVal;
            await this.getInit();
        },
        async limit(newVal) {
            this.limit = newVal;
            await this.getInit();
        }
    }
}
</script>
