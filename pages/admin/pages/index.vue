<template>
    <v-row>
        <v-col md="12">
            <v-card :loading="pending">
                <v-card-title>
                    Pages management

                    <v-btn
                        color="success"
                        class="float-right"
                        variant="text"
                        to="/admin/pages/create"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col md="12">
                            <v-table>
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>State</th>
                                    <th>Last updated</th>
                                    <th class="text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr v-if="items.length === 0 && pending">
                                    <td colspan="4" class="text-center">Loading data...</td>
                                </tr>

                                <tr v-else-if="items.length === 0">
                                    <td colspan="4" class="text-center">There is no data.</td>
                                </tr>

                                <tr v-for="page in items">
                                    <td>{{ page.title }}</td>

                                    <td>
                                        <span v-if="page.state"><v-icon color="success">mdi-check</v-icon></span>
                                        <span v-else><v-icon color="error">mdi-close</v-icon></span>
                                    </td>

                                    <td>{{ fDateTime(page.updatedAt ? page.updatedAt : page.createdAt) }}</td>

                                    <td>
                                        <v-btn
                                            color="primary"
                                            variant="text"
                                            class="float-right"
                                            :to="`/admin/pages/${page.uuid}`"
                                        >
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>

                                        <ComponentsAdminPageDelete
                                            :page="page"
                                            @updated="getInit"
                                        ></ComponentsAdminPageDelete>
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
                        label="page(s)"
                    ></ComponentsAdminTablePagination>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { fDateTime } from "~/models/AppFilter";
import ComponentsAdminTablePagination from '@/components/admin/table/pagination.vue';
import ComponentsAdminPageDelete from '@/components/admin/page/delete.vue';
import { useAdminTitle } from "~/composables/useAdminTitle";

useAdminTitle('Pages management');
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

            await axios.get(`/api/admin/pages?page=${this.page}&limit=${this.limit}`).then((res) => {
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
