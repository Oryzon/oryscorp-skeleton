import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";
import { AxiosError } from "axios";
import { useAuthStore } from "~/store/auth.store";

export const useErrorStore = defineStore('error', {
    state: () => ({ error: '', hasBeenRead: true }),
    getters: {
        getUnreadError: (state) => {
            if (!state.hasBeenRead) {
                return state.error;
            } else {
                return '';
            }
        },
    },
    actions: {
        async handle(event: any) {
            if (event instanceof Response) {
                if (event.status === 401) {
                    useToast().error("You've been disconnected.");
                    await useAuthStore().logout();
                } else {
                    useToast().error(event.statusText);
                }
            }

            if (event instanceof AxiosError) {
                if (event.response?.status === 401) {
                    useToast().error("You've been disconnected.");
                    await useAuthStore().logout();
                } else {
                    useToast().error(event.response ? event.response.statusText : '');
                }
            }
        },
    },
});
