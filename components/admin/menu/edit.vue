<template>
    <v-dialog
        v-model="dialog"
        width="800"
        transition="dialog-bottom-transition"
        :persistent="pending"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                color="primary"
                variant="text"
                v-bind="props"
                class="float-right"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>

        <v-card :loading="pending">
            <v-toolbar color="primary"><span class="ml-4">Edit</span></v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col md="6">
                        <v-text-field
                            label="Name"
                            v-model="menu.name"
                        ></v-text-field>
                    </v-col>

                    <v-col md="6">
                        <v-text-field
                            label="Slug"
                            v-model="menu.slug"
                        ></v-text-field>
                    </v-col>

                    <v-col md="6">
                        <v-text-field
                            label="Type"
                            v-model="menu.type"
                        ></v-text-field>
                    </v-col>

                    <v-col md="6">
                        <v-text-field
                            label="Position"
                            type="number"
                            v-model="menu.position"
                        ></v-text-field>
                    </v-col>

                    <v-col md="12">
                        <v-select
                            label="Page"
                            :items="pages"
                            v-model="menu.pageUuid"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-btn
                    color="error"
                    variant="text"
                    @click="data.dialog = false"
                    :loading="pending"
                    :disabled="pending"
                >
                    Abort
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                    color="primary"
                    variant="text"
                    @click="edit"
                    :loading="pending"
                    :disabled="pending"
                >
                    Edit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { useToast } from 'vue-toastification';
import axios from "axios";

export default {
    data() {
        return {
            dialog: false,
            pending: false,
            pagesFromApi: [],
        }
    },
    props: {
        menu: {
            type: Object
        }
    },
    methods: {
        async edit() {
            this.pending = true;

            await axios.put(`/api/admin/menu/${this.menu.uuid}`, {
                name: this.menu.name,
                type: this.menu.type,
                slug: this.menu.slug,
                position: parseInt(this.menu.position),
                pageUuid: this.menu.pageUuid
            }).then((res) => {
                useToast().success(res.data.message);
            }).catch((err) => {

            }).finally(() => {
                this.pending = false;
            });

            this.$emit('updated');

            this.dialog = false;
        }
    },
    computed: {
        pages() {
            return this.pagesFromApi.map((page) => {
                return {
                    title: `${page.title} - ${page.state ? 'Activated' : 'Desactivated'}`,
                    value: page.uuid
                }
            });
        }
    }
}
</script>
