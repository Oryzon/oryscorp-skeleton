<template>
    <v-row>
        <v-col md="12">
            <v-card :loading="pending">
                <v-card-title>Settings management</v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col md="10">
                            <v-text-field
                                label="Website title"
                                v-model="title"
                            ></v-text-field>
                        </v-col>

                        <v-col md="2">
                            <v-switch
                                label="Can register ?"
                                v-model="canRegister"
                                color="success"
                            ></v-switch>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="update" :loading="pending" :disabled="pending">Update</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { useState } from "#app";

definePageMeta({
    layout: "admin",
});

const { data: settings, refresh, pending } = await useFetch(`/api/admin/setting/`);

const title = computed({
    get() {
        const tmp = settings.value.find((setting) => setting.key === 'title');
        return tmp ? tmp.value : '';
    },
    set(newValue) {
        const tmp = settings.value.find((setting) => setting.key === 'title');
        tmp
            ? tmp.value = newValue
            : newValue;
    }
});

const canRegister = computed({
    get() {
        const tmp = settings.value.find((setting) => setting.key === 'canRegister');
        return tmp ? tmp.value === '1' : false;
    },
    set(newValue) {
        const tmp = settings.value.find((setting) => setting.key === 'canRegister');
        tmp
            ? tmp.value = newValue === true ? '1' : '0'
            : newValue;
    }
});

async function update() {
    const { data: pending } = await useFetch(`/api/admin/setting`, {
        method: 'put',
        body: {
            title: title.value,
            canRegister: canRegister.value ? '1' : '0'
        },
        onResponse({ response }) {
            if (response.status === 200) {
                useToast().success(response._data.message);
                useState('need-refresh').value = true;
                refresh();
            }
        },
        onResponseError({ response }) {
            useToast().error(response._data.message);
        }
    });
}

</script>
