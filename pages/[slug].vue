<template>
    <v-row>
        <v-col md="12">
            <v-card>
                <v-card-title>
                    {{ item.page?.title }}
                </v-card-title>

                <v-card-text>
                    {{ item.page?.content }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { useRoute, useSeoMeta } from "#app";
const { data: item } = await useFetch(`/api/public/menu/header/${useRoute().params.slug}`);

useSeoMeta({
    title: `${item.page?.title} - Skeleton`
})
</script>
