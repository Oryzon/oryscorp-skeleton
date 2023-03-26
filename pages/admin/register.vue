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
                                type="email"
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

<script setup>
import { useToast } from "vue-toastification";
import { useRouter } from "#app";

definePageMeta({
    layout: "no-layout",
});

const { data: canRegister } = await useFetch('/api/public/setting/canRegister');

if (canRegister?.value.value === '0') {
    useToast().error("You can't create an account on this website.");
    useRouter().push({path: '/'});
}

const user = reactive({ username: '', email: '', password: '', confPassword: '' });
let loading = reactive(false);

const canValid = computed(() => {
    return !!(
        user.username &&
        user.email &&
        user.password &&
        user.confPassword &&
        user.password === user.confPassword
    );
});

async function register() {
    loading = true;

    await useFetch(`/api/admin/auth/register`, {
        method: 'post',
        body: {
            username: user.username,
            email: user.email,
            password: user.password,
        },
        onResponse({ response }) {
            if (response.status === 200) {
                useToast().success(response._data.message);
                useRouter().push({ path: '/admin/login' });
            }
        },
        onResponseError({ response }) {
            useToast().error(response._data.message);

            if (response.status === 401) {
                useRouter().push({ path: '/' });
            }
        }
    })
}
</script>
