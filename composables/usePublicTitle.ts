import { useSeoMeta } from "#app";
import { useSettingStore } from "~/store/setting.store";

export const usePublicTitle = (pageTitle: string) => {
    let title = useSettingStore().getTitle;

    useSeoMeta({
        title: `${pageTitle} - ${title}`
    });
}
