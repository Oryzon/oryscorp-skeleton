<template>
    <v-dialog
        v-model="dialog"
        width="800"
        transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                class="float-right"
                color="success"
                v-bind="props"
                variant="text"
            >
                <v-icon>mdi-plus</v-icon>
                <span v-if="isIcon">&nbsp;Add</span>
            </v-btn>
        </template>

        <v-card>
            <v-toolbar color="success" class="pl-2"><v-icon>mdi-plus</v-icon>&nbsp;Add new menu</v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col md="6">
                        <v-text-field
                            label="Name"
                            v-model="entity.name"
                        ></v-text-field>
                    </v-col>

                    <v-col md="6">
                        <v-text-field
                            label="Slug"
                            v-model="entity.slug"
                        ></v-text-field>
                    </v-col>

                    <v-col md="6" class="mt-n4">
                        <v-text-field
                            label="Type"
                            v-model="entity.type"
                        ></v-text-field>
                    </v-col>

                    <v-col md="6" class="mt-n4">
                        <v-text-field
                            label="Position"
                            type="number"
                            v-model="entity.position"
                        ></v-text-field>
                    </v-col>

                    <v-col md="6" class="mt-n4">
                        <v-select
                            label="Page"
                            :items="pages"
                            v-model="entity.pageUuid"
                        ></v-select>
                    </v-col>

                    <v-col md="6" class="mt-n4">
                        <v-select
                            label="State"
                            :items="[
                                    {title: 'Activated', value: true},
                                    {title: 'Desactivated', value: false},
                                ]"
                            v-model="entity.state"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-btn color="error" @click="dialog = false" :disabled="pending">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="add" :disabled="pending" :loading="pending">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import { useErrorStore } from "~/store/error.store";

export default {
    data() {
        return {
            dialog: false,
            pending: false,
            entity: {
                name: '',
                type: '',
                slug: '',
                position: 0,
                pageUuid: null,
                state: null
            },
            pagesFromApi: [],
        }
    },
    props: {
        isIcon: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        async initPagesFromApi() {
            this.pending = true;

            await axios.get(`/api/admin/pages?limit=1000`).then((res) => {
                this.pagesFromApi = res.data.items;
            }).catch(async (err) => {
                await useErrorStore().handle(err);
            }).finally(() => {
                this.pending = false;
            })
        },
        async add() {
            this.pending = true;

            await axios.post(`/api/admin/menu`, {
                name: this.entity.name,
                type: this.entity.type,
                slug: this.entity.slug,
                position: parseInt(this.entity.position),
                pageUuid: this.entity.pageUuid,
                state: this.entity.state
            }).then((res) => {
                useToast().success(res.data.message);
                this.dialog = false;
            }).catch(async (err) => {
                await useErrorStore().handle(err);
            }).finally(() => {
                this.pending = false;
            });

            this.$emit('updated');
        }
    },
    computed: {
        pages() {
            return this.pagesFromApi.map((page) => {
                return {
                    title: `${page.title} - ${page.state ? 'Activated' : 'Desactivated'}`,
                    value: page.uuid
                }
            })
        }
    },
    watch: {
        async dialog(newVal) {
            if (newVal) {
                await this.initPagesFromApi();
            } else {
                this.entity = {
                    name: '',
                    type: '',
                    slug: '',
                    position: 0,
                    pageUuid: null,
                    state: null
                }
            }
        }
    }
}
</script>
