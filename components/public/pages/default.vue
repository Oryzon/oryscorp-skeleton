<template>
    <v-card>
        <v-card-title>
            {{ page?.title }} (default)
        </v-card-title>

        <v-card-text>
            {{ page?.content }}
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        page: {
            type: Object,
        }
    }
}
</script>
