<template>
    <ClientOnly>
        <NuxtLayout></NuxtLayout>
    </ClientOnly>
</template>

<script setup>
import { useSettingStore } from "~/store/setting.store";

useSettingStore().init();
</script>
