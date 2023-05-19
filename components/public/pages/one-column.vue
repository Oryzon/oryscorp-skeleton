<template>
    <section class="max-w-screen-xl mx-auto py-4 px-4 md:px-8">
        <div class="max-w-xl">
            <div class="py-4">
                <h3 class="text-3xl text-gray-800 font-semibold md:text-4xl">
                    {{ page?.title }}
                </h3>
                <p class="text-gray-500 leading-relaxed mt-3">
                    {{ page?.content }}
                </p>
            </div>
        </div>
    </section>
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
