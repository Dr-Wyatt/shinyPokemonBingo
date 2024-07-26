import axios from "axios";

const client = axios.create({ baseURL: "https://pokeapi.co/api/v2" });

export interface BasicPokemon {
  name: string;
  url: string;
}

interface GetAllPokemonResponse {
  count: number;
  next: number | undefined;
  previous: number | undefined;
  results: BasicPokemon[];
}

async function getAllPokemon(): Promise<GetAllPokemonResponse> {
  const { data } = await client.get<GetAllPokemonResponse>(
    "/pokemon?limit=1302",
  );

  return data;
}

export const PokeApiClient = {
  getAllPokemon,
};
