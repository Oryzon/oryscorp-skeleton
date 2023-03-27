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
                                <tr v-for="page in data.items">
                                    <td>{{ page.title }}</td>
                                    <td>{{ page.state }}</td>
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

definePageMeta({
    layout: "admin",
});

const page = ref(1);
const limit = ref(20);

const { data: data, refresh, pending } = await useFetch(() => `/api/admin/pages?page=${page.value}&limit=${limit.value}`);

watch(page, (newVal) => {
    page.value = newVal;
    refresh();
});

watch(limit, (newVal) => {
    limit.value = newVal;
    refresh();
});
</script>
