export async function useLoadPokemons(page = 1) {
  const pokemons = ref([]);
  const hasMoreData = ref(false);

  const { data, pending, error, refresh } = await useFetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`,
    {
      async onResponse({ response }) {
        const results = response._data.results;
        const promises = results?.map(({ name }) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
            res.json()
          )
        );
        const pokemonData = await Promise.all(promises);
        pokemons.value = pokemonData;
        hasMoreData.value = results.length > 0;
      },
      server: false,
      pick: ["id", "name", "types", "sprites"],
    }
  );

  return { data: pokemons.value, pending, error, hasMoreData, refresh };
}
