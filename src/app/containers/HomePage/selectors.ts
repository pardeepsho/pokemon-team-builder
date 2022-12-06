import { createSelector } from "reselect";
import { IRootState } from "../../types";

const selectHomePage = (state: IRootState) => state.homePage;

export const makeSelectPokemonList = createSelector(
  selectHomePage,
  (homePage) => homePage.pokemonList
);

export const makeSelectPokemonTeam = createSelector(
  selectHomePage,
  (homePage) => homePage.pokemonTeam
);
