<template>
    <v-row>
        <v-col md="12">
            <v-card :loading="pending">
                <v-card-title>Create a new bloc CMS</v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col md="6">
                            <v-text-field
                                label="Title"
                                v-model="entity.title"
                            ></v-text-field>
                        </v-col>

                        <v-col md="6">
                            <v-text-field
                                label="Unique key"
                                v-model="entity.key"
                            ></v-text-field>
                        </v-col>

                        <v-col md="12">
                            <v-textarea
                                label="Content"
                                v-model="entity.content"
                            ></v-textarea>
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

useAdminTitle('Create a bloc CMS');
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
                key: '',
                content: ''
            },
            pending: false,
        }
    },
    methods: {
        async add() {
            this.pending = true;

            await axios.post(`/api/admin/bloc-cms`, {
                title: this.entity.title,
                key: this.entity.key,
                content: this.entity.content
            }).then((res) => {
                useToast().success(res.data.message);
                useRouter().push({path: '/admin/bloc-cms'});
            }).catch(async (err) => {
                await useErrorStore().handle(err);
            }).finally(() => {
                this.pending = false;
            });
        }
    }
}
</script>
