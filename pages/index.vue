<template>
    <section class="py-20">
        <div class="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
            <div class="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
                <h1 class="text-sm text-teal-600 font-medium">
                    Lorem ipsum dolor sit amet,
                </h1>
                <h2 class="text-4xl text-gray-800 font-extrabold md:text-5xl">
                    Proin in sapien et elit accumsan iaculis eu molestie felis.
                </h2>
                <p>
                    Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
                </p>
                <div class="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                    <a  class="block py-2 px-4 text-center text-white font-medium bg-teal-600 duration-150 hover:bg-teal-500 active:bg-teal-700 rounded-lg shadow-lg hover:shadow-none">
                        Let's get started
                    </a>
                </div>
            </div>
            <div class="flex-none mt-14 md:mt-0 md:max-w-xl">
                <img
                    src="https://images.unsplash.com/photo-1573164713619-24c711fe7878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
                    class=" md:rounded-tl-[108px]"
                    alt=""
                />
            </div>
        </div>
    </section>
</template>

<script>
import { usePublicTitle } from "~/composables/usePublicTitle";

export default {
    setup() {
        usePublicTitle('Home');
    }
}
</script>
