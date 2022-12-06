import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  pokemonList: [] as any,
  pokemonTeam: [] as any,
};

const HomePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPokemonList(state, action) {
      state.pokemonList = action.payload;
    },
    setPokemonTeam(state, action) {
      state.pokemonTeam = action.payload;
    },
  },
});

export const { setPokemonList, setPokemonTeam } = HomePageSlice.actions;
export default HomePageSlice.reducer;
