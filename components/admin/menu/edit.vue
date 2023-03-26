<template>
    <v-dialog
        v-model="data.dialog"
        width="800"
        transition="dialog-bottom-transition"
        :persistent="data.loading"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                color="primary"
                variant="text"
                v-bind="props"
                class="float-right"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>

        <v-card :loading="data.loading">
            <v-toolbar color="primary"><span class="ml-4">Edit</span></v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col md="6">
                        <v-text-field
                            label="Name"
                            v-model="menu.name"
                        ></v-text-field>
                    </v-col>

                    <v-col md="6">
                        <v-text-field
                            label="Slug"
                            v-model="menu.slug"
                        ></v-text-field>
                    </v-col>

                    <v-col md="6">
                        <v-text-field
                            label="Type"
                            v-model="menu.type"
                        ></v-text-field>
                    </v-col>

                    <v-col md="6">
                        <v-text-field
                            label="Position"
                            type="number"
                            v-model="menu.position"
                        ></v-text-field>
                    </v-col>

                    <v-col md="12">
                        <v-select
                            label="Page"
                            :items="pages"
                            v-model="menu.pageUuid"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-btn
                    color="error"
                    variant="text"
                    @click="data.dialog = false"
                >
                    Abort
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                    color="primary"
                    variant="text"
                    @click="edit"
                >
                    Edit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useToast } from 'vue-toastification';

const emit = defineEmits(['updated']);

const props = defineProps({
    menu: {
        type: Object
    }
});

let data = reactive({
    dialog: false,
    loading: false,
});

const { data: pagesFromApi } = await useFetch(`/api/admin/pages/`);

const pages = computed(() => {
    return pagesFromApi.value.map((page) => {
        return {
            title: `${page.title} - ${page.state ? 'Activated' : 'Desactivated'}`,
            value: page.uuid
        }
    });
});

async function edit() {
    data.loading = true;

    await useFetch(`/api/admin/menu/${props.menu.uuid}`, {
        method: 'put',
        body: {
            name: props.menu.name,
            type: props.menu.type,
            slug: props.menu.slug,
            position: parseInt(props.menu.position),
            pageUuid: props.menu.pageUuid
        },
        onResponse({ response }) {
            if (response.status === 200) {
                useToast().success(response._data.message);
            }
        },
        onResponseError({ response }) {
            useToast().error(response._data.message);
        }
    });

    emit('updated');

    data.loading = false;
    data.dialog = false;
}
</script>
