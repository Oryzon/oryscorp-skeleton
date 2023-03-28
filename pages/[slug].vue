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
import { useRoute } from "#app";
import { usePublicTitle } from "~/composables/usePublicTitle";
const { data: item } = await useFetch(`/api/public/menu/header/${useRoute().params.slug}`);

usePublicTitle(item.value.page.title)
</script>
