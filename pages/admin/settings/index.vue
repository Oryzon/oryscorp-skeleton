<template>
    <v-row>
        <v-col md="12">
            <v-card :loading="pending">
                <v-card-title>Settings management</v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col md="10">
                            <v-text-field
                                label="Website title"
                                v-model="title"
                            ></v-text-field>
                        </v-col>

                        <v-col md="2">
                            <v-switch
                                label="Can register ?"
                                v-model="canRegister"
                                color="success"
                            ></v-switch>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="update" :loading="pending" :disabled="pending">Update</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { useToast } from "vue-toastification";
import { useState } from "#app";
import axios from "axios";

export default {
    setup() {
        definePageMeta({
            layout: "admin",
        });
    },
    data() {
        return {
            pending: false,
            settings: [],
        }
    },
    async mounted() {
        await this.getInit();
    },
    methods: {
        async getInit() {
            this.pending = true;

            await axios.get(`/api/admin/setting/`).then((res) => {
                this.settings = res.data;
            }).catch((err) => {

            }).finally(() => {
                this.pending = false;
            });
        },
        async update() {
            this.pending = true;

            await axios.put(`/api/admin/setting`, {
                title: this.title,
                canRegister: this.canRegister ? '1' : '0'
            }).then((res) => {
                useToast().success(res.data.message);
                useState('need-refresh').value = true;
                this.refresh();
            }).catch((err) => {

            }).finally(() => {
                this.pending = false;
            });
        }
    },
    computed: {
        title: {
            get() {
                const tmp = this.settings.find((setting) => setting.key === 'title');
                return tmp ? tmp.value : '';
            },
            set(newValue) {
                const tmp = this.settings.find((setting) => setting.key === 'title');

                tmp ? tmp.value = newValue : newValue;
            }
        },
        canRegister: {
            get() {
                const tmp = this.settings.find((setting) => setting.key === 'canRegister');
                return tmp ? tmp.value === '1' : false;
            },
            set(newValue) {
                const tmp = this.settings.find((setting) => setting.key === 'canRegister');
                tmp
                    ? tmp.value = newValue === true ? '1' : '0'
                    : newValue;
            }
        }
    },
}
</script>
