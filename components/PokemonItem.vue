<template>
    <div class="pokemon card">
        <div class="card__inner">
            <nuxt-link :to="`/pokemon/${pokemon.name}`">
                <div class="pokemon__name">
                    <h3>{{ pokemon.name }}</h3>
                    <span>{{ `#${pokemon.id}` }}</span>
                </div>
                <div class="pokemon__thumbnail">
                    <img :src="pokemon.thumbnail" :alt="pokemon.name" :srcset="pokemon.thumbnail" class="main-page-img">
                </div>
                <div class="pokemon__type">
                    <span v-for="ty in pokemon.type" :key="ty" :class="`pokemon--type pokemon--type-${ty}`">{{ ty }}</span>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>

<script setup>
const { pokemon } = defineProps(['pokemon'])
</script>