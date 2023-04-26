<template>
    <NuxtLayout></NuxtLayout>
</template>

<script setup>
import { useSettingStore } from "~/store/setting.store";

useSettingStore().init();
</script>
