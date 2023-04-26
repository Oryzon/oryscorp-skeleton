<template>
    <v-row justify="center" align="center">
        <v-col md="6">
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col md="6">
                            <v-text-field
                                label="Username"
                                v-model="user.username"
                            ></v-text-field>
                        </v-col>

                        <v-col md="6">
                            <v-text-field
                                label="E-Mail"
                                v-model="user.email"
                            ></v-text-field>
                        </v-col>


                        <v-col md="6" class="mt-n4">
                            <v-text-field
                                label="Password"
                                v-model="user.password"
                                type="password"
                            ></v-text-field>
                        </v-col>

                        <v-col md="6" class="mt-n4">
                            <v-text-field
                                label="Confirmation of password"
                                v-model="user.confPassword"
                                type="password"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="error" variant="text" :to="'/'">Abort</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="success" variant="text" :disabled="!canValid" @click="register">Register</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { useToast } from "vue-toastification";
import { useRouter } from "#app";
import axios from "axios";

export default {
    setup() {
        const { data: canRegister } = useFetch('/api/public/setting/canRegister');

        if (canRegister?.value.value === '0') {
            useToast().error("You can't create an account on this website.");
            useRouter().push({path: '/'});
        }
    },
    data() {
        return {
            pending: false,
            user: {
                username: '',
                email: '',
                password: '',
                confPassword: ''
            }
        }
    },
    computed: {
        canValid() {
            return !!(
                this.user.username &&
                this.user.email &&
                this.user.password &&
                this.user.confPassword &&
                this.user.password === this.user.confPassword
            );
        }
    },
    methods: {
        async register() {
            this.pending = true;

            await axios.post(`/api/admin/auth/register`, {
                username: this.user.username,
                email: this.user.email,
                password: this.user.password
            }).then((res) => {
                useToast().success(res.data.message);
                useRouter().push({ path: '/admin/login' });
            }).catch((err) => {
                useToast().error(err.response.data.message);
            });
        }
    }
}
</script>

<script setup>
import { useToast } from "vue-toastification";
import { useRouter } from "#app";

definePageMeta({
    layout: "no-layout",
});
</script>
