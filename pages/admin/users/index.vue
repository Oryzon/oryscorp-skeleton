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
                                <tr v-for="user in data.items">
                                    <td>{{ user.username }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ fDateTime(user.createdAt )}}</td>

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
                        :length="data.count"
                        label="user(s)"
                    ></ComponentsAdminTablePagination>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { fDateTime } from "../../../models/AppFilter";
import ComponentsAdminTablePagination from '@/components/admin/table/pagination.vue';

definePageMeta({
    layout: "admin",
});

const page = ref(1);
const limit = ref(20);

const { data: data, refresh, pending } = await useFetch(() => `/api/admin/user?page=${page.value}&limit=${limit.value}`);

watch(page, (newVal) => {
    page.value = newVal;
    refresh();
});

watch(limit, (newVal) => {
    limit.value = newVal;
    refresh();
});
</script>
