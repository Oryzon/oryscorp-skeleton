<template>
    <v-row>
        <v-col md="12">
            <v-card :loading="pending">
                <v-card-title>Edit the page </v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col md="12">
                            <v-text-field
                                label="Title"
                                v-model="page.title"
                            ></v-text-field>
                        </v-col>

                        <v-col md="12" class="mt-n6">
                            <v-textarea
                                label="Content"
                                v-model="page.content"
                            ></v-textarea>
                        </v-col>

                        <v-col md="4" class="mt-n6 mb-n6">
                            <p v-text="'You can use bloc CMS if you add <%KEY_OF_THE_BLOC_CMS%> in the content.'"></p>
                        </v-col>

                        <v-col md="4" class="mt-n6 mb-n6">
                            <v-text-field
                                    label="Template"
                                    v-model="page.template"
                            ></v-text-field>
                        </v-col>

                        <v-col md="4" class="mt-n6 mb-n6">
                            <v-select
                                label="State"
                                :items="[
                                    { title: 'Activated', value: true },
                                    { title: 'Desactivated', value: false },
                                ]"
                                v-model="page.state"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="error" text :disabled="pending">Abort</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="success" text :disabled="pending" :loading="pending" @click="update">Edit</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { useAdminTitle } from "~/composables/useAdminTitle";

useAdminTitle('Edit a page');
definePageMeta({
    layout: "admin",
});
</script>

<script>
import axios from "axios";
import { useErrorStore } from "~/store/error.store";
import {useToast} from "vue-toastification";

export default {
    data() {
        return {
            page: {
                title: '',
                content: '',
                state: '',
                template: '',
            },
            pending: false,
        }
    },
    async mounted() {
        await this.getInit();
    },
    methods: {
        async getInit() {
            this.pending = true;

            await axios.get(`/api/admin/pages/${this.$route.params.uuid}`).then((res) => {
                this.page = res.data;
            }).catch(async (err) => {
                await useErrorStore().handle(err);
            }).finally(() => {
                this.pending = false;
            })
        },
        async update() {
            this.pending = true;

            await axios.put(`/api/admin/pages/${this.$route.params.uuid}`, {
                title: this.page.title,
                content: this.page.content,
                state: this.page.state,
                template: this.page.template,
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
