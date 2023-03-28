import { defineStore } from "pinia";
import axios from "axios";

export const useSettingStore = defineStore('setting', {
    state: () => ({
        title: null,
    }),
    getters: {
        getTitle: (state) => {
            return state.title;
        }
    },
    actions: {
        async init() {
            await axios.get(`/api/public/setting`).then((res) => {
                res.data.forEach((setting: any) => {
                    if (setting.key === 'title') {
                        this.title = setting.value;
                    }
                });
            });
        }
    }
});
