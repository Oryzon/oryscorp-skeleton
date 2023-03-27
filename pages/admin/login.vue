<template>
    <v-row justify="center" align="center">
        <v-col md="6">
            <v-card>
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
                    <v-btn color="error" variant="text" @click="reset">Reset</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="success" variant="text" @click="login">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { useCookie, useRouter } from "#app";

definePageMeta({
    layout: "no-layout",
});

const user = reactive({username: '', password: ''});
let loading = ref(false);

function reset() {
    user.username = '';
    user.password = '';
}

async function login() {
    loading = true;

    await useFetch(`/api/admin/auth/login`, {
        method: 'post',
        body: {
            username: user.username,
            password: user.password
        },
        onResponse({ response }) {
            if (response.status === 200) {
                const auth = useCookie('auth');
                auth.value = response._data.token;

                useToast().success('Welcome back ');
                useRouter().push({path: '/admin/'});
            }

            loading = false;
        },
        onResponseError({ response }) {
            if (response.status === 401) {
                useToast().error(response._data.message);
                user.password = '';
            }
        }
    })

}
</script>
