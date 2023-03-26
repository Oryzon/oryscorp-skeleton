<template>
    <v-row>
        <v-col md="12">
            <v-card :loading="data.loading">
                <v-card-title>Create a new page</v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col md="12">
                            <v-text-field
                                label="Title"
                                v-model="data.entity.title"
                            ></v-text-field>
                        </v-col>

                        <v-col md="12" class="mt-n6">
                            <v-textarea
                                label="Content"
                                v-model="data.entity.content"
                            ></v-textarea>
                        </v-col>

                        <v-col md="4" offset-md="8" class="mt-n6 mb-n6">
                            <v-select
                                label="State"
                                :items="[
                                    {title: 'Activated', value: 1},
                                    {title: 'Desactivated', value: 0},
                                ]"
                                v-model="data.entity.state"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="error" text :disabled="data.loading">Abort</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="success" text :disabled="data.loading" :loading="data.loading" @click="add">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { useToast } from "vue-toastification";

definePageMeta({
    layout: "admin",
});

let data = reactive({
    dialog: false,
    loading: false,
    entity: {
        title: '',
        content: '',
        state: '',
    }
});

async function add() {
    data.loading = true;

     await useFetch(`/api/admin/pages/`, {
        method: 'post',
        body: {
            title: data.entity.title,
            content: data.entity.content,
            state: parseInt(data.entity.state)
        },
        onResponse({ request, response, options }) {
            if (response.status === 200) {
                useToast().success(response._data.message);
            }
        },
        onResponseError({ request, response, options }) {
            useToast().error(response._data.message);
        }
    });

    data.loading = false;
    data.dialog = false;
}

</script>
