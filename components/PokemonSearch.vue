<script setup>
const pokemon = ref("");
const router = useRouter()

function handleSubmit() {
  
  if (!pokemon.value) {
    return
  }
  
  const query = { pokemon: pokemon.value }
  router.push({ path: '/', query })
}

</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="form__item">
      <label for="" class="form__label">Enter pokemon</label>
      <input type="text" placeholder="E.g.Picachu" name="pokemon" class="form__input" v-model.trim="pokemon" />
    </div>
    <button type="submit" class="btn btn--submit">Go</button>
  </form>
</template>
