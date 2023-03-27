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
                                <tr v-for="user in users">
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
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import {fDateTime} from "../../../models/AppFilter";

definePageMeta({
    layout: "admin",
});

const { data: users, refresh, pending } = await useFetch(`/api/admin/user/`);
</script>
