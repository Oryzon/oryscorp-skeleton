<template>
    <v-dialog
        v-model="data.dialog"
        width="1000"
        transition="dialog-bottom-transition"
        :persistent="data.loading"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                color="error"
                variant="text"
                class="float-right"
                v-bind="props"
            >
                <v-icon>mdi-trash-can</v-icon>
            </v-btn>
        </template>

        <v-card :loading="data.loading">
            <v-toolbar color="error"><span class="ml-4">Delete a menu</span></v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <h4>Warning !</h4><br />

                        <p>You are going to delete a menu.</p>
                        <p>You are going to delete the menu called <strong>{{ props.menu.name }}</strong>, and this action is fianl.</p>
                        <p>Are you sure you want to continue ?</p>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-btn
                    color="error"
                    variant="text"
                    @click="data.dialog = false"
                >
                    No, I abort.
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                    color="success"
                    variant="text"
                    @click="remove"
                >
                    Yes, I delete.
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

async function remove() {
    data.loading = true;

    await useFetch(`/api/admin/menu/${props.menu.uuid}`, {
        method: 'delete',
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
