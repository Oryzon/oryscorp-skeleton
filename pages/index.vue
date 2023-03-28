<template>
    <v-row>
        <v-col md="12">
            <v-card>
                <v-card-title>Home</v-card-title>

                <v-card-text>Empty text.</v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { usePublicTitle } from "~/composables/usePublicTitle";

usePublicTitle('Home');
</script>
