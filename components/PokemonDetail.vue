<template>
  <PokemonCard>
    <template #header>
      <div style="display: flex; flex-direction: column; margin-right: auto;">
        <div>{{ `#${pokemon.id}` }}</div>
        <h1>{{ pokemon.name }}</h1>
      </div>
      <div class="pokemon__detail__type">
        <span v-for="ty in types" :key="ty" :class="`pokemon--type pokemon--type-${ty}`">{{ ty }}</span>
      </div>
    </template>
    <template #content>
      <div class="pokemon__detail__content">
        <div class="pokemon__detail__content__thumbnail">
          <img :src="pokemon.sprites.other.dream_world.front_default" :alt="pokemon.name"
            :srcset="pokemon.sprites.other.dream_world.front_default" class="single-page-img" />
        </div>
        <div class="pokemon__detail__content__stats">
          <div class="pokemon__detail__content__stats">
            <div v-for="stat in stats" :key="stat.stat" class="stats">
              <div class="pokemon__stats__name">{{ stat.stat }}</div>
              <div :class="`pokemon__stats__bar progress_bar progress_bar--${stat.stat}`">
                <div :class="`progress_bar__inner stats--${stat.stat}`" :style="{ width: `${stat.base}px` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </PokemonCard>

  <div class="possession">
    <PokemonCard title="Breeding">
      <template #content>
        <div class="breeding">
          <div v-for="br in breeding" :class="`specs breeding__${br.label}`" :key="br.label">
            <span class="label">{{ br.label }}</span>
            <span class="value">{{ br.value }}</span>
          </div>
        </div>
      </template>
    </PokemonCard>

    <PokemonCard title="Abilities">
      <template #content>
        <div class="abilities">
          <div v-for="ability in abilities" :key="ability" :class="`ability ability--${ability} color color--${ability.charAt(
            0
          )}`">
            <span class="label">{{ ability.charAt(0) }}</span>
            <span class="value">{{ ability }}</span>
          </div>
        </div>
      </template>
    </PokemonCard>
  </div>

  <PokemonCard title="Moves">
    <template #header>
      <button type="button" class="btn btn--primary" @click="showAll = !showAll">{{ !showAll ? `View More` : `View Less`
      }}</button>
    </template>
    <template #content>
      <div class="moves">
        <div v-for="move in trimmedArray" :key="move"
          :class="`move move--${move.name} color color--${move.name.charAt(0)}`">
          <span class="label">{{ move.name.charAt(0) }}</span>
          <span class="value">{{ move.name }}</span>
        </div>
      </div>
    </template>
  </PokemonCard>
</template>

<script setup>
import PokemonCard from "./PokemonCard.vue";
const { pokemon, moves, stats, types, breeding, abilities } = defineProps([
  "pokemon",
  "moves",
  "stats",
  "types",
  "breeding",
  "abilities",
]);
const showAll = ref(false)

const trimmedArray = computed(() => {
  return showAll.value ? moves : moves.slice(0, 12)
})

</script>
