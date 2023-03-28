<template>
    <v-row>
        <v-col md="12">
            <v-card :loading="pending">
                <v-card-title>Create a new page</v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col md="12">
                            <v-text-field
                                label="Title"
                                v-model="entity.title"
                            ></v-text-field>
                        </v-col>

                        <v-col md="12" class="mt-n6">
                            <v-textarea
                                label="Content"
                                v-model="entity.content"
                            ></v-textarea>
                        </v-col>

                        <v-col md="4" offset-md="8" class="mt-n6 mb-n6">
                            <v-select
                                label="State"
                                :items="[
                                    {title: 'Activated', value: 1},
                                    {title: 'Desactivated', value: 0},
                                ]"
                                v-model="entity.state"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="error" text :disabled="pending">Abort</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="success" text :disabled="pending" :loading="pending" @click="add">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { useAdminTitle } from "~/composables/useAdminTitle";

useAdminTitle('Create a page');
definePageMeta({
    layout: "admin",
});
</script>

<script>
import { useToast } from "vue-toastification";
import { useRouter } from "#app";
import axios from "axios";
import { useErrorStore } from "~/store/error.store";

export default {
    data() {
        return {
            dialog: false,
            entity: {
                title: '',
                content: '',
                state: '',
            },
            pending: false,
        }
    },
    methods: {
        async add() {
            this.pending = true;

            await axios.post(`/api/admin/pages`, {
                title: this.entity.title,
                content: this.entity.content,
                state: parseInt(this.entity.state)
            }).then((res) => {
                useToast().success(res.data.message);
                useRouter().push({path: '/admin/pages'});
            }).catch(async (err) => {
                await useErrorStore().handle(err);
            }).finally(() => {
                this.pending = false;
            });
        }
    }
}
</script>
