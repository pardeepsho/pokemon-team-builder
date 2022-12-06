import { gql } from "graphql-tag";
export const GET_POKEMON_LIST = gql`
  query PokemonList {
    pokemon_v2_pokemon {
      id
      name
      pokemon_v2_pokemonsprites {
        id
        sprites
      }
    }
  }
`;
