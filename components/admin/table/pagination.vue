<template>
    <v-row>
        <v-col class="text-left hidden-sm-and-down mt-6" md="3">
            There is {{ length }} {{ label }}.
        </v-col>

        <v-col cols="12" md="6" class="mt-3">
            <v-pagination
                :value="page"
                @update:modelValue="pageChange"
                :length="pageCount"
                :total-visible="10"
            ></v-pagination>
        </v-col>

        <v-col cols="12" md="3" class="mt-3">
            <v-select
                outlined
                :value="limit"
                @update:modelValue="limitChange"
                label="Lines per page"
                :items="choices"
            >
            </v-select>
        </v-col>

        <v-col class="text-truncate hidden-md-and-up" cols="12">
            There is {{ length }} {{ label }}.
        </v-col>
    </v-row>
</template>

<script setup>
const props = defineProps({
    page: {
        type: String
    },
    limit: {
        type: String
    },
    label: {
        type: String
    },
    length: {
        type: String
    }
});

const choices = [
    { title: `20 entity per page` , value: 20 },
    { title: `40 entity per page` , value: 40 },
    { title: `60 entity per page` , value: 60 },
    { title: `80 entity per page` , value: 80 },
    { title: `100 entity per page` , value: 100 },
];

let emit = defineEmits(['update:page', 'update:limit']);

const pageCount = computed(() => {
    return Math.ceil(props.length / props.limit);
});

function pageChange(event) {
    emit('update:page', event);
}

function limitChange(event) {
    emit('update:limit', event);
}
</script>
