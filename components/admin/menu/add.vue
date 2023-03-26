<template>
    <v-dialog
        v-model="data.dialog"
        width="800"
        transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                class="float-right"
                color="success"
                v-bind="props"
                variant="text"
            >
                <v-icon>mdi-plus</v-icon>
                <span v-if="props.isIcon">&nbsp;Add</span>
            </v-btn>
        </template>

        <v-card :loading="data.loading">
            <v-toolbar color="success" class="pl-2"><v-icon>mdi-plus</v-icon>&nbsp;Add new menu</v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col md="6">
                        <v-text-field
                            label="Name"
                            v-model="data.entity.name"
                        ></v-text-field>
                    </v-col>

                    <v-col md="6">
                        <v-text-field
                            label="Slug"
                            v-model="data.entity.slug"
                        ></v-text-field>
                    </v-col>

                    <v-col md="6">
                        <v-text-field
                            label="Type"
                            v-model="data.entity.type"
                        ></v-text-field>
                    </v-col>

                    <v-col md="6">
                        <v-text-field
                            label="Position"
                            type="number"
                            v-model="data.entity.position"
                        ></v-text-field>
                    </v-col>

                    <v-col md="12">
                        <v-select
                            label="Page"
                            :items="pages"
                            v-model="data.entity.pageUuid"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-btn color="error" @click="data.dialog = false" :disabled="data.loading">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="add" :disabled="data.loading" :loading="data.loading">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useToast } from 'vue-toastification';

const emit = defineEmits(['updated']);

const props = defineProps({
    isIcon: {
        type: Boolean,
        default: true,
    }
});

let data = reactive({
    dialog: false,
    loading: false,
    entity: {
        name: '',
        type: '',
        slug: '',
        position: 0,
        pageUuid: null,
    }
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

async function add() {
    data.loading = true;

    const { data: message } = await useFetch(`/api/admin/menu/`, {
        method: 'post',
        body: {
            name: data.entity.name,
            type: data.entity.type,
            slug: data.entity.slug,
            position: parseInt(data.entity.position),
            pageUuid: data.entity.pageUuid
        },
        onResponse({ request, response, options }) {
            if (response.status === 200) {
                useToast().success(response._data.message);
            }
        },
        onResponseError({ request, response, options }) {
            useToast().error(response._data.message);
        }
    });

    emit('updated');

    data.loading = false;
    data.dialog = false;
}
</script>
