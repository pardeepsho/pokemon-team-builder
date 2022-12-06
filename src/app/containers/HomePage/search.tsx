import React, { ChangeEvent, useEffect, useState } from "react";
import { createSelector } from "reselect";
import styled from "styled-components";
import { Dispatch } from "redux";
import { setPokemonTeam } from "./homePageSlice";
import { useAppSelector } from "../../hooks";
import { useAppDispatch } from "../../hooks";
import { makeSelectPokemonList, makeSelectPokemonTeam } from "./selectors";
import {
  PokemonList,
  PokemonList_pokemon_v2_pokemon,
} from "../../services/pokemonService/__generated__/PokemonList";
import { setConstantValue } from "typescript";
const SearchBox = styled.input`
  color: grey;
  border-radius: 10px;
  width: 500px;
  height: 20px;
  border: none;
  font-size: 20px;
  :focus {
    outline: none;
  }
`;
const SuggestionContainer = styled.div`
  color: grey;
  width: auto;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 15px;
  position: absolute;
  background-color: white;
  overflow-y: scroll;
  max-height: 200px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
  &::-webkit-scrollbar {
    width: 0px;
    border: 0px solid black;
  }
`;

const Suggestions = styled.div`
  color: grey;
  margin: 2px;
  width: auto;
  height: 20px;
  padding: 10px;
  cursor: pointer;
  border-bottom: 0.1px solid rgba(255, 200, 254, 1);
`;
const SearchBoxContainer = styled.div`
  color: grey;
  border-radius: 10px;
  width: auto;
  height: 20px;
  padding: 10px;
  border: 1px solid grey;
`;

const stateSelector1 = createSelector(
  makeSelectPokemonList,
  (pokemonList: PokemonList) => ({
    pokemonList,
  })
);
const stateSelector2 = createSelector(
  makeSelectPokemonTeam,
  (pokemonTeam: PokemonList) => ({
    pokemonTeam,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setPokemonTeam: (data: PokemonList) => dispatch(setPokemonTeam(data)),
});

export function Search() {
  const [focus, setFocus] = useState(false);
  const [teamSize, setTeamSize] = useState(0);
  const [searchText, setSearchText] = useState({ value: "" });
  const [searchResult, setSearchResult] = useState<
    PokemonList_pokemon_v2_pokemon[]
  >([]);
  const { pokemonList } = useAppSelector(stateSelector1);
  const { pokemonTeam } = useAppSelector(stateSelector2);
  const { setPokemonTeam } = actionDispatch(useAppDispatch());

  const addToPokemonList = (data: PokemonList_pokemon_v2_pokemon) => {
    let pokemonArray: PokemonList_pokemon_v2_pokemon[] = [];
    let newPokemonTeam: PokemonList = { pokemon_v2_pokemon: [] };
    pokemonTeam?.pokemon_v2_pokemon?.forEach(
      (p: PokemonList_pokemon_v2_pokemon) => {
        newPokemonTeam.pokemon_v2_pokemon.push(p);
      }
    );
    newPokemonTeam.pokemon_v2_pokemon.push(data);
    setPokemonTeam(newPokemonTeam);
    setSearchText({ value: "" });
  };

  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    setSearchText({ value: event?.currentTarget?.value });
  };

  useEffect(() => {
    let searchArray = pokemonList?.pokemon_v2_pokemon?.filter(
      (a: PokemonList_pokemon_v2_pokemon) =>
        !pokemonTeam?.pokemon_v2_pokemon?.includes(a)
    );
    var result = searchArray?.filter((e: any) =>
      e.name.includes(searchText.value)
    );
    setSearchResult(result);
    setTeamSize(pokemonTeam?.pokemon_v2_pokemon?.length || 0);
  }, [searchText, pokemonTeam]);

  return (
    <div>
      {teamSize <= 5 ? (
        <SearchBoxContainer>
          <SearchBox
            onChange={handleChange}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            value={searchText.value}
            placeholder="Search pokemons..."
          />
          {focus ? (
            <SuggestionContainer>
              {searchResult?.map((pokemon: any, i: number) => (
                <Suggestions
                  key={i}
                  onMouseDown={() => {
                    addToPokemonList(pokemon);
                  }}
                >
                  <img src=""></img>
                  {pokemon.name}
                </Suggestions>
              ))}
            </SuggestionContainer>
          ) : null}
        </SearchBoxContainer>
      ) : (
        <div></div>
      )}
    </div>
  );
}
