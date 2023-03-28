<template>
    <v-dialog
        v-model="dialog"
        width="1000"
        transition="dialog-bottom-transition"
        :persistent="pending"
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

        <v-card :loading="pending">
            <v-toolbar color="error"><span class="ml-4">Delete a page</span></v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <h4>Warning !</h4><br />

                        <p>You are going to delete a page.</p>
                        <p>You are going to delete the page called <strong>{{ page.title }}</strong>, and this action is final.</p>
                        <p>All menu linked to this page are goind to be reset and desactivated.</p>
                        <p>Are you sure you want to continue ?</p>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-btn
                    color="error"
                    variant="text"
                    @click="dialog = false"
                    :disabled="pending"
                >
                    No, I abort.
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                    color="success"
                    variant="text"
                    @click="remove"
                    :loading="pending"
                >
                    Yes, I delete.
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { useToast } from "vue-toastification";
import axios from "axios";
import { useErrorStore } from "~/store/error.store";

export default {
    data() {
        return {
            dialog: false,
            pending: false,
        }
    },
    props: {
        page: {
            type: Object
        }
    },
    methods: {
        async remove() {
            this.pending = true;

            await axios.delete(`/api/admin/pages/${this.page.uuid}`).then((res) => {
                useToast().success(res.data.message);
            }).catch(async (err) => {
                await useErrorStore().handle(err);
            }).finally(() => {
                this.pending = false;
            })

            this.$emit('updated');
            this.dialog = false;
        }
    }
}
</script>
