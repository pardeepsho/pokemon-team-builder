import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { createSelector } from "reselect";
import { setPokemonTeam } from "./../containers/HomePage/homePageSlice";
import { useAppSelector } from "../hooks";
import { Dispatch } from "redux";
import { useAppDispatch } from "../hooks";
import {
  makeSelectPokemonList,
  makeSelectPokemonTeam,
} from "../containers/HomePage/selectors";
import {
  PokemonList,
  PokemonList_pokemon_v2_pokemon,
} from "../services/pokemonService/__generated__/PokemonList";
const grid: number = 8;
const data = [
  { name: "Position 1", id: 1 },
  { name: "Position 2", id: 2 },
];
const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  // change background colour if dragging
  background: isDragging ? "lightblue" : "lightgrey",
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "white" : "white",
  padding: grid,
  width: 500,
});

const getIconStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "white" : "white",
  padding: grid,
  width: `50px`,
  align: `right`,
  border: `2px solid palevioletred`,
});

const getSlotStyle = () => ({
  background: "white",
  padding: grid,
  width: `480px`,
  margin: `10px`,
  height: `60px`,
  border: `1px dashed palevioletred`,
});

const getPositionStyle = () => ({
  color: `lightgrey`,
  fontSize: `30px`,
  align: `center`,
});

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result: PokemonList_pokemon_v2_pokemon[] = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const stateSelector = createSelector(
  makeSelectPokemonTeam,
  (pokemonTeam: PokemonList) => ({
    pokemonTeam,
  })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setPokemonTeam: (data: PokemonList) => dispatch(setPokemonTeam(data)),
});
export function Dnd() {
  const { pokemonTeam } = useAppSelector(stateSelector);
  const [teamSize, setTeamSize] = useState(0);
  const { setPokemonTeam } = actionDispatch(useAppDispatch());
  const [items, setItems] = useState(pokemonTeam);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    if (!pokemonTeam?.pokemon_v2_pokemon) {
      return;
    }

    const newItems: PokemonList_pokemon_v2_pokemon[] = reorder(
      pokemonTeam?.pokemon_v2_pokemon,
      result.source.index,
      result.destination.index
    );
    let newPokemonTeam: PokemonList = { pokemon_v2_pokemon: [] };
    pokemonTeam?.pokemon_v2_pokemon?.forEach(
      (p: PokemonList_pokemon_v2_pokemon, i: number) => {
        newPokemonTeam.pokemon_v2_pokemon.push(newItems[i]);
      }
    );
    console.log(newPokemonTeam);
    setItems(newPokemonTeam);
  };

  const removeItem = (result: PokemonList_pokemon_v2_pokemon) => {
    console.log(pokemonTeam, result.id);
    let newPokemonTeam: PokemonList = { pokemon_v2_pokemon: [] };
    newPokemonTeam.pokemon_v2_pokemon = pokemonTeam?.pokemon_v2_pokemon?.filter(
      (item: any) => item.id !== result.id
    );
    setItems(newPokemonTeam);
  };
  useEffect(() => {
    setItems(pokemonTeam);
    setTeamSize(pokemonTeam?.pokemon_v2_pokemon?.length || 0);
  }, [pokemonTeam]);
  useEffect(() => {
    setPokemonTeam(items);
  }, [items]);
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items?.pokemon_v2_pokemon?.map(
                (item: PokemonList_pokemon_v2_pokemon, index: number) => (
                  <Draggable
                    key={item.id.toString()}
                    index={index}
                    draggableId={item.id.toString()}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.name}
                        <div
                          style={getIconStyle(snapshot.isDragging)}
                          onClick={() => {
                            removeItem(item);
                          }}
                        >
                          {"Remove"}
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {teamSize < 6 ? (
        <div>
          {[...Array(6 - teamSize)].map((e, i) => (
            <div style={getSlotStyle()}>
              <p style={getPositionStyle()}>{teamSize + i + 1}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
