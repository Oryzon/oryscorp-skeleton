import { defineStore } from 'pinia';
import { useRouter, useCookie } from "#app";
import { useToast } from "vue-toastification";
import { AxiosError } from "axios";

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
                useToast().error(event.statusText);

                if (event.status === 401) {
                    const auth = useCookie('auth');

                    if (auth) {
                        auth.value = null;
                    }

                    await useRouter().push({path: '/admin/login'});
                }
            }

            if (event instanceof AxiosError) {
                useToast().error(event.response ? event.response.statusText : '');
            }
        },
    },
});
