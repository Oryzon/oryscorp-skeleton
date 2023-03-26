import { DateTime } from "luxon";

export const capitalize = (value: String) => {
    if (!value) return '';

    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export const fDateTime = (value: string) => {
    const dt = DateTime.fromISO(value).setLocale('fr');

    return dt.toFormat('dd/MM/yyyy à HH:mm:ss');
}
