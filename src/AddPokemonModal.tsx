import {
  Modal,
  ModalDialog,
  DialogTitle,
  Button,
  Autocomplete,
  Select,
  Option,
} from "@mui/joy";
import { BingoSquare } from "./BingoBoard";
import React, { useCallback, useEffect, useState } from "react";
import {
  BasicPokemon,
  GameType,
  GenerationType,
  GetPokemonResponse,
  PokeApiClient,
} from "./api/pokeapi/client";

function getOptionLabel(option: BasicPokemon): string {
  return option.name.charAt(0).toUpperCase() + option.name.slice(1);
}

function formatGenerationsDisplay(generation: GenerationType): string {
  switch (generation) {
    case "generation-i":
      return "Generation 1";
    case "generation-ii":
      return "Generation 2";
    case "generation-iii":
      return "Generation 3";
    case "generation-iv":
      return "Generation 4";
    case "generation-v":
      return "Generation 5";
    case "generation-vi":
      return "Generation 6";
    case "generation-vii":
      return "Generation 7";
    case "generation-viii":
      return "Generation 8";
    default: {
      const exhaustiveCheck: never = generation;
      return exhaustiveCheck;
    }
  }
}

function formatGamesDisplay(game: GameType): string {
  switch (game) {
    case "rb":
      return "Red/Blue";
    case "yellow":
      return "Yellow";
    case "gold":
      return "Gold";
    case "silver":
      return "Silver";
    case "crystal":
      return "Crystal";
    case "rs":
      return "Ruby/Sapphire";
    case "emerald":
      return "Emerald";
    case "frlg":
      return "Fire Red/Leaf Green";
    case "dp":
      return "Diamond/Pearl";
    case "platinum":
      return "Platinum";
    case "hgss":
      return "Heart Gold/Soul Silver";
    case "bw":
      return "Black/White";
    case "oras":
      return "Omega Ruby/Alpha Sapphire";
    case "xy":
      return "X/Y";
    case "usum":
      return "Ultra Sun/Ultra Moon";
    case "swsh":
      return "Sword/Shield";
    default:
      return "";
  }
}

interface ModalProps {
  listOfPokemon: BasicPokemon[] | undefined;
  square: BingoSquare | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addPokemon: (
    // eslint-disable-next-line no-unused-vars
    updatedSquare: BingoSquare,
    // eslint-disable-next-line no-unused-vars
    updateType: "add" | "statusUpdate",
  ) => void;
}

export function AddPokemonModal(props: ModalProps): React.JSX.Element {
  const { square, open, setOpen, addPokemon, listOfPokemon } = props;

  const [selectedPokemon, setSelectedPokemon] = useState<BasicPokemon | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<string | undefined>("");

  const [sprites, setSprites] = useState<
    GetPokemonResponse["sprites"] | undefined
  >();

  const [generations, setGenerations] = useState<GenerationType[]>([]);
  const [selectedGeneration, setSelectedGeneration] =
    useState<GenerationType | null>(null);

  const [games, setGames] = useState<GameType[]>([]);
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);

  const handleSearchChange = useCallback(
    async (
      _event: React.SyntheticEvent,
      newSelectedPokemon: BasicPokemon | null,
    ) => {
      if (newSelectedPokemon) {
        setSelectedPokemon(newSelectedPokemon);

        // Make API Call
        const { sprites } = await PokeApiClient.getPokemon(
          newSelectedPokemon.name,
        );

        const generationsArray = Object.keys(sprites)
          .map((key) => [key, sprites[key as keyof typeof sprites]])
          .map((generation) => generation[0] as GenerationType);

        setGenerations(generationsArray);
        setSprites(sprites);
      }
    },
    [],
  );

  const handleSearchInputChange = useCallback(
    (_event: React.SyntheticEvent, newSearchTerm: string) => {
      setSearchTerm(newSearchTerm);
    },
    [],
  );

  const handleGenerationChange = useCallback(
    (_event: React.SyntheticEvent | null, value: GenerationType | null) => {
      if (value && sprites) {
        setSelectedGeneration(value);
        const narrowedGeneration = sprites[value];
        const gamesArray = Object.keys(narrowedGeneration)
          .map((key) => [
            key,
            narrowedGeneration[key as keyof typeof narrowedGeneration],
          ])
          .map((game) => game[0] as GameType);
        setGames(gamesArray);
      }
    },
    [sprites],
  );

  const handleGameChange = useCallback(
    (_event: React.SyntheticEvent | null, value: GameType | null) => {
      if (value) {
        setSelectedGame(value);
      }
    },
    [],
  );

  const handleAddPokemon = useCallback(() => {
    if (square && selectedGeneration && sprites && selectedGame) {
      addPokemon(
        {
          ...square,
          name: selectedPokemon?.name
            ? selectedPokemon.name.charAt(0).toUpperCase() +
              selectedPokemon.name.slice(1)
            : undefined,
          path: sprites[selectedGeneration][selectedGame],
          game: formatGamesDisplay(selectedGame),
        },
        "add",
      );
    }
    setOpen(false);
  }, [square, selectedGeneration, sprites, selectedGame]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    setSelectedPokemon(null);
    setSelectedGame(null);
    setSelectedGeneration(null);
    setSearchTerm("");
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalDialog>
        <DialogTitle>Add Pokemon</DialogTitle>

        <Autocomplete
          disableClearable={selectedPokemon !== null}
          autoComplete
          getOptionLabel={getOptionLabel}
          options={listOfPokemon ?? []}
          placeholder={"Search for a Pokemon!"}
          value={selectedPokemon}
          onChange={handleSearchChange}
          inputValue={searchTerm}
          onInputChange={handleSearchInputChange}
        />

        <Select
          placeholder={"Select a Generation"}
          onChange={handleGenerationChange}
          value={selectedGeneration}
          disabled={!selectedPokemon}
        >
          {generations.map((value: GenerationType) => (
            <Option key={value} value={value}>
              {formatGenerationsDisplay(value)}
            </Option>
          ))}
        </Select>
        <Select
          placeholder={"Select a game"}
          onChange={handleGameChange}
          value={selectedGame}
          disabled={!selectedPokemon || !selectedGeneration}
        >
          {games.map((game) => (
            <Option key={game} value={game}>
              {formatGamesDisplay(game)}
            </Option>
          ))}
        </Select>
        <Button
          disabled={!selectedPokemon || !selectedGeneration || !selectedGame}
          onClick={handleAddPokemon}
        >
          Add Pokemon
        </Button>
      </ModalDialog>
    </Modal>
  );
}
