import React from "react";
import { createSelector } from "reselect";
import styled from "styled-components";
import { useAppSelector } from "../../hooks";
import { PokemonList } from "../../services/pokemonService/__generated__/PokemonList";
import { makeSelectPokemonList } from "./selectors";
const ViewPokemonContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PokemonItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 16em;
  padding: 10px;
  margin: 1px;
  border: 1px solid grey;
  border-radius: 10px;
  align-items: center;
`;

const PokemonCover = styled.div`
  height: 10em;
  width: auto;
  border: 1px;
  align-items: center;
  img {
    width: auto;
    height: 100px;
  }
`;
const PokemonDetails = styled.div`
  flex-direction: row;
`;

const PokemonTitle = styled.h6`
  font-size: 19px;
  color: #000;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 10px;
`;

const Button = styled.button`
  color: grey;
  border-radius: 10px;
  width: 11rem;
  height: 25px;
  border: 2px solid grey;
`;

const stateSelector = createSelector(
  makeSelectPokemonList,
  (pokemonList: PokemonList) => ({
    pokemonList,
  })
);
export function ViewPokemon() {
  const { pokemonList } = useAppSelector(stateSelector);
  const isEmptyPokemonList = !pokemonList;
  if (isEmptyPokemonList) return <div>Loading...</div>;
  return (
    <ViewPokemonContainer>
      {/* {pokemonList.pokemon_v2_pokemon?.map((pokemon: any) => (
        <PokemonItemContainer key={pokemon.id}>
          <PokemonCover>
            <img src={"pokemon?.coverImage?.medium" || ""} />
          </PokemonCover>
          <PokemonDetails>
            <PokemonTitle>{pokemon.name}</PokemonTitle>
            <Button>View Details</Button>
          </PokemonDetails>
        </PokemonItemContainer>
      ))} */}
    </ViewPokemonContainer>
  );
}
