/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PokemonList
// ====================================================

export interface PokemonList_pokemon_v2_pokemon_pokemon_v2_pokemonsprites {
  __typename: "pokemon_v2_pokemonsprites";
  id: number;
  sprites: string;
}

export interface PokemonList_pokemon_v2_pokemon {
  __typename: "pokemon_v2_pokemon";
  id: number;
  name: string;
  /**
   * An array relationship
   */
  pokemon_v2_pokemonsprites: PokemonList_pokemon_v2_pokemon_pokemon_v2_pokemonsprites[];
}

export interface PokemonList {
  /**
   * fetch data from the table: "pokemon_v2_pokemon"
   */
  pokemon_v2_pokemon: PokemonList_pokemon_v2_pokemon[];
}
