import { useSeoMeta } from "#app";
import {useSettingStore} from "~/store/setting.store";

export const useAdminTitle = (pageTitle: string) => {
    let title = useSettingStore().getTitle;

    useSeoMeta({
        title: `${pageTitle} - ${title}`
    });
}
