<template>
  <div v-if="pending || isLoading" class="spinner"></div>
  <div v-else-if="error || errorMsg">
    <NotFound />
  </div>
  <div v-else id="content" class="main">
    <div v-for="pokemon in formattedPokemons" :key="pokemon.id" class="item"
      :style="{ width: formattedPokemons.length === 1 ? '320px' : 'auto' }">
      <PokemonItem :pokemon="pokemon" />
    </div>
  </div>
  <Pagination :items="formattedPokemons" :page="page" :hasMoreData="hasMoreData" @handlePaginate="pagination" />
</template>

<script setup>
definePageMeta({
  layout: "main",
})

const route = useRoute()

const page = ref(1)
const pokemons = ref([])
const hasMoreData = ref(false)
const isLoading = ref(false)
const errorMsg = ref(false)

const url = computed(() => `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page.value - 1) * 20}`)

const { pending, error } = await useFetch(url,
  {
    async onResponse({ response }) {
      const results = response._data.results
      const promises = results?.map(({ name }) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
          res.json()
        )
      )
      const pokemonData = await Promise.all(promises)
      pokemons.value = pokemonData
      hasMoreData.value = results.length > 0
    },
    async onResponseError({ response }) {
      errorMsg.value = true
    },
    server: false,
    pick: ["id", "name", "types", "sprites"],
  }
)

const fetchQuery = async () => {
  isLoading.value = true
  await useFetch(`https://pokeapi.co/api/v2/pokemon/${route.query.pokemon}`,
    {
      pick: ["id", "name", "types", "sprites"],
      async onResponse({ response }) {
        if (response._data) {
          pokemons.value = []
          pokemons.value.push(response._data)
          isLoading.value = false
          errorMsg.value = false
        }
      },
      async onResponseError({ response }) {
        errorMsg.value = true
      },
    }
  )
}

const formattedPokemons = computed(() => {
  return pokemons.value?.map(({ id, name, types, sprites }) => {
    return {
      id: id,
      name: name,
      type: types?.map((type) => type.type.name),
      thumbnail: sprites?.other.dream_world.front_default,
    }
  })
})

const pagination = (pageNumber) => {
  page.value = pageNumber
}


watch(
  () => route.query,
  () => {
    fetchQuery()
  },
)
</script>
