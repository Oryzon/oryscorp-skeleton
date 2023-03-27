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
                        <tr v-for="page in pages">
                            <td>{{ page.title }}</td>
                            <td>{{ page.state }}</td>
                            <td>{{ fDateTime(page.updatedAt ? page.updatedAt : page.createdAt) }}</td>
                            <td>

                            </td>
                        </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { fDateTime } from "~/models/AppFilter";

definePageMeta({
    layout: "admin",
});

const { data: pages, refresh, pending } = await useFetch(`/api/admin/pages/`);
</script>
