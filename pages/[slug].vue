<template>
    <div>
        <Default
            v-if="item?.page?.template === null || item?.page?.template === ''"
            :page="item?.page"
        ></Default>

        <OneColumn
            v-if="item?.page?.template === 'one-column'"
            :page="item?.page"
        ></OneColumn>
    </div>
</template>

<script>
import Default from "~/components/public/pages/default.vue";
import OneColumn from "~/components/public/pages/one-column.vue";

export default {
    async setup() {
        const { data: item } = await useFetch(`/api/public/menu/header/${useRoute().params.slug}`);

        usePublicTitle(item?.value?.page?.title);

        return {
            item,
        }
    },
    components: {
        Default,
        OneColumn
    }
}
</script>
