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

<script>
export default {
    setup() {

    },
    props: {
        page: {
            type: Number
        },
        limit: {
            type: Number
        },
        label: {
            type: String
        },
        length: {
            type: Number
        }
    },
    data() {
        return {
            choices: [
                { title: `20 entity per page` , value: 20 },
                { title: `40 entity per page` , value: 40 },
                { title: `60 entity per page` , value: 60 },
                { title: `80 entity per page` , value: 80 },
                { title: `100 entity per page` , value: 100 },
            ]
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.length / this.limit);
        }
    },
    methods: {
        pageChange(event) {
            this.$emit('update:page', event);
        },
        limitChange(event) {
            this.$emit('update:limit', event);
        }
    }
}
</script>
