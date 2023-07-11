<template>
  <div v-if="pending">
    Loading ...
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>
  <div id="content" class="single" v-else>
    <div class="single-page">
      <PokemonDetail :pokemon="pokemon" :stats="formattedStats" :moves="formattedMoves" :types="formattedTypes"
        :breeding="formattedBreeding" :abilities="formattedAbilities" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "single",
})

const route = useRoute()
const name = route.params.id

const {
  data: pokemon,
  pending,
  error,
  refresh,
} = await useFetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

const formattedTypes = computed(() => {
  return pokemon.value.types.map(data => data.type.name)
})

const formattedStats = computed(() => {
  return pokemon.value.stats.map((data) => {
    return {
      base: data.base_stat,
      stat: data.stat.name,
    }
  })
})

const formattedMoves = computed(() => {
  return pokemon.value.moves.map((data) => data.move)
})

const formattedBreeding = computed(() => {
  return [
    {
      label: 'height',
      value: parseInt(pokemon.value.height)
    },
    {
      label: 'weight',
      value: parseInt(pokemon.value.weight)
    }
  ]
})

const formattedAbilities = computed(() => {
  return pokemon.value.abilities.map(data => data.ability.name)
})
</script>
