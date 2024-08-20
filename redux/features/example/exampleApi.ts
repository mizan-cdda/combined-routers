// Need to use the React-specific entry point to import createApi
import { apiSlice } from "../api/api";

export type Pokemon = {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
};

// Define a service using a base URL and expected endpoints
export const pokemonApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi;
