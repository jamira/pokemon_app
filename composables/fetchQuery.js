export async function useFetchQuery() {
  const route = useRoute();
  const { data, pending, error, refresh } = await useFetch(
    `https://pokeapi.co/api/v2/pokemon/${route.query.pokemon}`,
    {
      pick: ["id", "name", "types", "sprites"],
      async onResponse({ response }) {
        if (response._data) {
          pokemons.value = [];
          pokemons.value.push(response._data);
        }
      },
      async onResponseError({ response }) {
        notFound.value.push({
          title: response._data,
          text: `The Pokemon ${route.query.pokemon} you're looking for is a unicorn. It doens't exist in the list.`,
        });
      },
    }
  );

  return { data, pending, error, refresh };
}
