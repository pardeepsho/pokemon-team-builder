import React, { useEffect } from "react";
import styled from "styled-components";
import { Dispatch } from "redux";
import pokemonService from "../../services/pokemonService";
import { setPokemonList } from "./homePageSlice";
import {
  PokemonList,
  PokemonList_pokemon_v2_pokemon,
} from "../../services/pokemonService/__generated__/PokemonList";
import { useAppDispatch } from "../../hooks";
import { ViewPokemon } from "./viewPokemon";
import { Search } from "./search";
import { Dnd } from "./../../compoents/dnd";

interface IHomePageProps {}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setPokemonList: (data: PokemonList) => dispatch(setPokemonList(data)),
});

export function HomePage(props: IHomePageProps) {
  const { setPokemonList } = actionDispatch(useAppDispatch());

  const fetchPokemonList = async () => {
    const pokemonList = await pokemonService.getPokemonList().catch((err) => {
      console.log("Eror: ", err);
    });
    if (pokemonList) setPokemonList(pokemonList);
  };

  useEffect(() => {
    fetchPokemonList();
  });
  return (
    <Container>
      <h1>Pokemon Team Builder</h1>
      <Search />
      <Dnd />
      <ViewPokemon />
    </Container>
  );
}
