<template>
    <section class="card">
        <div class="card__inner">
            <header class="card__header">
                <h2 class="card__title" v-if="title">{{ title }}</h2>
                <slot name="header"></slot>
            </header>
            <section class="card__content">
                <slot name="content"></slot>
            </section>
        </div>
    </section>
</template>

<script setup>
const { title } = defineProps(['title'])
</script>