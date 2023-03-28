<template>
    <v-row>
        <v-col md="12">
            <v-card>
                <v-card-title>Dashboard</v-card-title>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { useCookie, useState } from "#app";
import { useAdminTitle } from "~/composables/useAdminTitle";

useAdminTitle('Dashboard');
definePageMeta({
    layout: "admin",
});
</script>
