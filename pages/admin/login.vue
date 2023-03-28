<template>
    <v-row justify="center" align="center">
        <v-col md="6">
            <v-card :loading="pending">
                <v-card-text>
                    <v-row>
                        <v-col md="12">
                            <h3 class="text-center">Connection</h3>
                        </v-col>

                        <v-col md="12">
                            <v-text-field
                                label="Username"
                                v-model="user.username"
                            ></v-text-field>
                        </v-col>

                        <v-col md="12" class="mt-n4">
                            <v-text-field
                                label="Password"
                                v-model="user.password"
                                type="password"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="error" variant="text" @click="reset" :disabled="pending">Reset</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="success" variant="text" @click="login" :loading="pending" :disabled="pending">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { useAdminTitle } from "~/composables/useAdminTitle";

useAdminTitle('Login');
definePageMeta({
    layout: "no-layout",
});
</script>

<script>
import axios from "axios";
import { useErrorStore } from "~/store/error.store";
import { useAuthStore } from "~/store/auth.store";

export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
            pending: false,
        }
    },
    methods: {
        reset() {
            this.user.username = '';
            this.user.password = '';
        },
        async login() {
            this.pending = true;

            await axios.post(`/api/admin/auth/login`, {
                username: this.user.username,
                password: this.user.password
            }).then((res) => {
                useAuthStore().login(res);
            }).catch((err) => {
                useErrorStore().handle(err);
            }).finally(() => {
                this.pending = false;
            });
        }
    }
}
</script>
