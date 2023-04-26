<template>
    <v-row>
        <v-col md="12">
            <Default
                    v-if="item.page?.template === null"
                    :page="item.page"
            ></Default>

            <OneColumn
                    v-if="item.page?.template === 'one-column'"
                    :page="item.page"
            ></OneColumn>
        </v-col>
    </v-row>
</template>

<script setup>
import Default from "~/components/public/pages/default.vue";
import OneColumn from "~/components/public/pages/one-column.vue";

import { useRoute } from "#app";
import { usePublicTitle } from "~/composables/usePublicTitle";

const { data: item } = await useFetch(`/api/public/menu/header/${useRoute().params.slug}`);

usePublicTitle(item.value.page.title);
</script>
