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

interface APISpritesOther {
  dream_world: {
    front_default: string | null;
    front_female: string | null;
  };
  home: {
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  "official-artwork": {
    front_default: string | null;
    front_shiny: string | null;
  };
  // These are gifs
  showdown: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
}

interface APISpritesVersions {
  "generation-i": {
    "red-blue": {
      back_default: string | null;
      back_gray: string | null;
      front_default: string | null;
      front_gray: string | null;
      back_transparent: string | null;
      front_transparent: string | null;
    };
    yellow: {
      back_default: string | null;
      back_gray: string | null;
      front_default: string | null;
      front_gray: string | null;
      back_transparent: string | null;
      front_transparent: string | null;
    };
  };
  "generation-ii": {
    crystal: {
      back_default: string | null;
      back_shiny: string | null;
      front_default: string | null;
      front_shiny: string | null;
      back_transparent: string | null;
      front_transparent: string | null;
      front_shiny_transparent: string | null;
      back_shiny_transparent: string | null;
    };
    gold: {
      back_default: string | null;
      back_shiny: string | null;
      front_default: string | null;
      front_shiny: string | null;
    };
    silver: {
      back_default: string | null;
      back_shiny: string | null;
      front_default: string | null;
      front_shiny: string | null;
    };
  };
  "generation-iii": {
    emerald: { front_default: string | null; front_shiny: string | null };
    "firered-leafgreen": {
      back_default: string | null;
      back_shiny: string | null;
      front_default: string | null;
      front_shiny: string | null;
    };
    "ruby-sapphire": {
      back_default: string | null;
      back_shiny: string | null;
      front_default: string | null;
      front_shiny: string | null;
    };
  };
  "generation-iv": {
    "diamond-pearl": {
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    "heartgold-soulsilver": {
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    platinum: {
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
  "generation-v": {
    "black-white": {
      animated: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
  "generation-vi": {
    "omegaruby-alphasapphire": {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    "x-y": {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
  "generation-vii": {
    icons: { front_default: string | null; front_female: string | null };
    "ultra-sun-ultra-moon": {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
  "generation-viii": {
    icons: {
      front_default: string | null;
      front_female: string | null;
    };
  };
}

// type APIGames = APISpritesVersions[GenerationType];

interface APIGetPokemonResponseSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: APISpritesOther;
  versions: APISpritesVersions;
}

interface APIGetPokemonResponse {
  id: number;
  name: string;
  sprites: APIGetPokemonResponseSprites;
}

interface GetPokemonResponseSprites {
  [key: string]: {
    [key: string]: string;
  };
}

export type GenerationType =
  | "generation-i"
  | "generation-ii"
  | "generation-iii"
  | "generation-iv"
  | "generation-v"
  | "generation-vi"
  | "generation-vii"
  | "generation-viii";

export type GameType =
  | "rb"
  | "yellow"
  | "gold"
  | "silver"
  | "crystal"
  | "rs"
  | "emerald"
  | "frlg"
  | "dp"
  | "platinum"
  | "hgss"
  | "bw"
  | "oras"
  | "xy"
  | "usum"
  | "swsh";

export interface GetPokemonResponse {
  id: number;
  name: string;
  sprites: GetPokemonResponseSprites;
}

function mapVersions(
  versions: APISpritesVersions,
  defaultShiny: string | null,
): GetPokemonResponseSprites {
  let gamesObject = {};

  const generation1 = versions["generation-i"];

  if (
    generation1["red-blue"].front_transparent &&
    generation1.yellow.front_transparent
  ) {
    gamesObject = {
      ...gamesObject,
      "generation-i": {
        rb: generation1["red-blue"].front_transparent,
        yellow: generation1.yellow.front_transparent,
      },
    };
  } else if (generation1["red-blue"].front_transparent) {
    gamesObject = {
      ...gamesObject,
      "generation-i": {
        rb: generation1["red-blue"].front_transparent,
      },
    };
  } else if (generation1.yellow.front_transparent) {
    gamesObject = {
      ...gamesObject,
      "generation-i": {
        yellow: generation1.yellow.front_transparent,
      },
    };
  }

  const generation2 = versions["generation-ii"];

  if (generation2.crystal.front_shiny_transparent) {
    gamesObject = {
      ...gamesObject,
      "generation-ii": {
        crystal: generation2.crystal.front_shiny_transparent,
        gold: generation2.crystal.front_shiny_transparent,
        silver: generation2.crystal.front_shiny_transparent,
      },
    };
  }

  const generation3 = versions["generation-iii"];

  if (
    generation3.emerald.front_shiny &&
    generation3["ruby-sapphire"].front_shiny &&
    generation3["firered-leafgreen"].front_shiny
  ) {
    gamesObject = {
      ...gamesObject,
      "generation-iii": {
        emerald: generation3.emerald.front_shiny,
        rs: generation3["ruby-sapphire"].front_shiny,
        frlg: generation3["firered-leafgreen"].front_shiny,
      },
    };
  } else if (
    generation3.emerald.front_shiny &&
    generation3["ruby-sapphire"].front_shiny
  ) {
    gamesObject = {
      ...gamesObject,
      "generation-iii": {
        emerald: generation3.emerald.front_shiny,
        rs: generation3["ruby-sapphire"].front_shiny,
      },
    };
  } else if (
    generation3.emerald.front_shiny &&
    generation3["firered-leafgreen"].front_shiny
  ) {
    gamesObject = {
      ...gamesObject,
      "generation-iii": {
        emerald: generation3.emerald.front_shiny,
        frlg: generation3["firered-leafgreen"].front_shiny,
      },
    };
  } else if (
    generation3["ruby-sapphire"].front_shiny &&
    generation3["firered-leafgreen"].front_shiny
  ) {
    gamesObject = {
      ...gamesObject,
      "generation-iii": {
        rs: generation3["ruby-sapphire"].front_shiny,
        frlg: generation3["firered-leafgreen"].front_shiny,
      },
    };
  } else if (generation3.emerald.front_shiny) {
    gamesObject = {
      ...gamesObject,
      "generation-iii": {
        emerald: generation3.emerald.front_shiny,
      },
    };
  } else if (generation3["ruby-sapphire"].front_shiny) {
    gamesObject = {
      ...gamesObject,
      "generation-iii": {
        rs: generation3["ruby-sapphire"].front_shiny,
      },
    };
  } else if (generation3["firered-leafgreen"].front_shiny) {
    gamesObject = {
      ...gamesObject,
      "generation-iii": {
        frlg: generation3["firered-leafgreen"].front_shiny,
      },
    };
  }

  const generation4 = versions["generation-iv"];

  if (
    generation4["diamond-pearl"].front_shiny &&
    generation4.platinum.front_shiny &&
    generation4["heartgold-soulsilver"].front_shiny
  ) {
    gamesObject = {
      ...gamesObject,
      "generation-iv": {
        dp: generation4["diamond-pearl"].front_shiny,
        platinum: generation4.platinum.front_shiny,
        hgss: generation4["heartgold-soulsilver"].front_shiny,
      },
    };
  } else if (
    generation4["diamond-pearl"].front_shiny &&
    generation4.platinum.front_shiny
  ) {
    gamesObject = {
      ...gamesObject,
      "generation-iv": {
        dp: generation4["diamond-pearl"].front_shiny,
        platinum: generation4.platinum.front_shiny,
      },
    };
  } else if (
    generation4["diamond-pearl"].front_shiny &&
    generation4["heartgold-soulsilver"].front_shiny
  ) {
    gamesObject = {
      ...gamesObject,
      "generation-iv": {
        dp: generation4["diamond-pearl"].front_shiny,
        hgss: generation4["heartgold-soulsilver"].front_shiny,
      },
    };
  } else if (
    generation4.platinum.front_shiny &&
    generation4["heartgold-soulsilver"].front_shiny
  ) {
    gamesObject = {
      ...gamesObject,
      "generation-iv": {
        platinum: generation4.platinum.front_shiny,
        hgss: generation4["heartgold-soulsilver"].front_shiny,
      },
    };
  } else if (generation4["diamond-pearl"].front_shiny) {
    gamesObject = {
      ...gamesObject,
      "generation-iv": {
        dp: generation4["diamond-pearl"].front_shiny,
      },
    };
  } else if (generation4.platinum.front_shiny) {
    gamesObject = {
      ...gamesObject,
      "generation-iv": {
        platinum: generation4.platinum.front_shiny,
      },
    };
  } else if (generation4["heartgold-soulsilver"].front_shiny) {
    gamesObject = {
      ...gamesObject,
      "generation-iv": {
        hgss: generation4["heartgold-soulsilver"].front_shiny,
      },
    };
  }

  const generation5 = versions["generation-v"];
  if (generation5["black-white"].front_shiny) {
    gamesObject = {
      ...gamesObject,
      "generation-v": { bw: generation5["black-white"].front_shiny },
    };
  }

  const generation6 = versions["generation-vi"];

  if (
    generation6["omegaruby-alphasapphire"].front_shiny &&
    generation6["x-y"].front_shiny
  ) {
    gamesObject = {
      ...gamesObject,
      "generation-vi": {
        oras: generation6["omegaruby-alphasapphire"].front_shiny,
        xy: generation6["x-y"].front_shiny,
      },
    };
  } else if (generation6["omegaruby-alphasapphire"].front_shiny) {
    gamesObject = {
      ...gamesObject,
      "generation-vi": {
        oras: generation6["omegaruby-alphasapphire"].front_shiny,
      },
    };
  } else if (generation6["x-y"].front_shiny) {
    gamesObject = {
      ...gamesObject,
      "generation-vi": {
        xy: generation6["x-y"].front_shiny,
      },
    };
  }

  const generation7 = versions["generation-vii"];
  if (generation7["ultra-sun-ultra-moon"].front_shiny) {
    gamesObject = {
      ...gamesObject,
      "generation-vii": {
        usum: generation7["ultra-sun-ultra-moon"].front_shiny,
      },
    };
  }

  const generation8 = versions["generation-viii"];

  if (generation8["icons"].front_default) {
    gamesObject = {
      ...gamesObject,
      "generation-viii": { swsh: defaultShiny ?? "" },
    };
  }

  return gamesObject;
}

function mapToGetPokemonResponse(
  response: APIGetPokemonResponse,
): GetPokemonResponse {
  const { id, name } = response;

  const sprites = mapVersions(
    response.sprites.versions,
    response.sprites.front_shiny,
  );

  return {
    id,
    name,
    sprites,
  };
}

async function getPokemon(name: string): Promise<GetPokemonResponse> {
  const { data } = await client.get<APIGetPokemonResponse>(`/pokemon/${name}`);

  return mapToGetPokemonResponse(data);
}

export const PokeApiClient = {
  getAllPokemon,
  getPokemon,
};
