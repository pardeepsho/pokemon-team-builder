import { responsePathAsArray } from "graphql";
import { apolloClient } from "../../graphql";
import { GET_POKEMON_LIST } from "./queries";
import { PokemonList } from "./__generated__/PokemonList";

class PokemonService {
  async getPokemonList(): Promise<PokemonList> {
    try {
      const response = await apolloClient.query({
        query: GET_POKEMON_LIST,
      });
      if (!response || !response.data)
        throw new Error("Can't get Pokemon Data");

      return response.data;
    } catch (err) {
      throw err;
    }
  }
}

export default new PokemonService();
