<template>
    <v-row>
        <v-col md="12">
            <v-card :loading="pending">
                <v-card-title>Edit the page </v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col md="12">
                            <v-text-field
                                label="Title"
                                v-model="page.title"
                            ></v-text-field>
                        </v-col>

                        <v-col md="12" class="mt-n6">
                            <v-textarea
                                label="Content"
                                v-model="page.content"
                            ></v-textarea>
                        </v-col>

                        <v-col md="4" offset-md="8" class="mt-n6 mb-n6">
                            <v-select
                                label="State"
                                :items="[
                                    {title: 'Activated', value: true},
                                    {title: 'Desactivated', value: false},
                                ]"
                                v-model="page.state"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="error" text :disabled="pending">Abort</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="success" text :disabled="pending" :loading="pending" @click="update">Edit</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { useRoute, useRouter } from "#app";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();

definePageMeta({
    layout: "admin",
});

const { data: page, pending } = await useFetch(`/api/admin/pages/${route.params.uuid}`);

async function update() {

}

</script>
