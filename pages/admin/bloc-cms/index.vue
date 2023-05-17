<template>
    <v-row>
        <v-col md="12">
            <v-card :loading="pending">
                <v-card-title>
                    Bloc CMS management

                    <v-btn
                        color="success"
                        class="float-right"
                        variant="text"
                        to="/admin/bloc-cms/create"
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
                                    <th>Key</th>
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

                                <tr v-for="blocCms in items">
                                    <td>{{ blocCms.title }}</td>

                                    <td>
                                        {{ blocCms.key }}
                                    </td>

                                    <td>{{ fDateTime(blocCms.updatedAt ? blocCms.updatedAt : blocCms.createdAt) }}</td>

                                    <td>
                                        <v-btn
                                            color="primary"
                                            variant="text"
                                            class="float-right"
                                            :to="`/admin/bloc-cms/${blocCms.uuid}`"
                                        >
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
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
                        label="bloc(s) CMS"
                    ></ComponentsAdminTablePagination>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { fDateTime } from "~/models/AppFilter";
import ComponentsAdminTablePagination from '@/components/admin/table/pagination.vue';
import { useAdminTitle } from "~/composables/useAdminTitle";

useAdminTitle('Bloc CMS management');
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

            await axios.get(`/api/admin/bloc-cms?page=${this.page}&limit=${this.limit}`).then((res) => {
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
