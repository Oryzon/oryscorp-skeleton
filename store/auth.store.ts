import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";
import { useCookie, useRouter, CookieRef } from "#app";
import { useToast } from "vue-toastification";
import { User } from ".prisma/client";

interface AuthState {
    auth: CookieRef<any> | null,
    user: User | null
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => {
        return {
            auth: null,
            user: null
        }
    },
    getters: {
        getUser: (state) => {
            return state.user;
        },
    },
    actions: {
        login(res: AxiosResponse) {
            if (res.status === 200) {
                this.auth = useCookie('auth');
                this.auth = res.data.token;

                this.setUser().then(async () => {
                    useToast().success(`Welcome back ${this.user?.username} !`);
                    await useRouter().push({ path: '/admin/' });
                });
            }
        },
        async setUser() {
            await axios.get(`/api/admin/user/profile`).then((res) => {
                this.user = res.data;
            });
        },
        logout() {

        },
        refresh() {
            this.setUser().then(async () => {
                useToast().success(`Welcome back ${this.user?.username} !`);
            });
        }
    }
});
