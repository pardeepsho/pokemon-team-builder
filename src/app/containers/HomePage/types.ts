import {
  PokemonList,
  PokemonList_pokemon_v2_pokemon,
} from "../../services/pokemonService/__generated__/PokemonList";

export interface IHomePageState {
  pokemonList: PokemonList;
  pokemonTeam: PokemonList;
}
