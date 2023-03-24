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
                <span v-if="isIcon">&nbsp;Add</span>
            </v-btn>
        </template>

        <v-card :loading="data.loading">
            <v-toolbar color="success" class="pl-2"><v-icon>mdi-plus</v-icon>&nbsp;Add new menu</v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col md="6">
                        <v-text-field
                            label="Name"
                        ></v-text-field>
                    </v-col>

                    <v-col md="6">
                        <v-text-field
                            label="Slug"
                        ></v-text-field>
                    </v-col>

                    <v-col md="6">
                        <v-text-field
                            label="Type"
                        ></v-text-field>
                    </v-col>

                    <v-col md="6">
                        <v-text-field
                            label="Position"
                        ></v-text-field>
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
const emit = defineEmits(['added']);

defineProps({
    isIcon: {
        type: Boolean,
        default: true,
    }
});

let data = reactive({dialog: false, loading: false})

async function add() {
    data.loading = true;

    let fet = await useFetch(`/api/admin/menu/`, {
        method: 'post',
        body: {
            name: 'test',
            type: 'header',
            slug: 'hello',
            position: 3
        }
    });

    emit('added', fet.data.value);

    data.loading = false;
    data.dialog = false;
}
</script>
