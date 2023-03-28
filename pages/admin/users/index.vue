<template>
    <v-row>
        <v-col md="12">
            <v-card :loading="pending">
                <v-card-title>
                    Users management
                </v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col md="12">
                            <v-table>
                                <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>E-Mail</th>
                                    <th>Created at</th>
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

                                <tr v-else v-for="user in items">
                                    <td>{{ user.username }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ fDateTime(user.createdAt) }}</td>

                                    <td>

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
                        label="user(s)"
                    ></ComponentsAdminTablePagination>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { fDateTime } from "~/models/AppFilter";
import ComponentsAdminTablePagination from '@/components/admin/table/pagination.vue';
</script>

<script>
import axios from "axios";

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

            await axios.get(`/api/admin/user?page=${this.page}&limit=${this.limit}`).then((res) => {
                this.items = res.data.items;
                this.count = res.data.count;
            }).catch((err) => {

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
