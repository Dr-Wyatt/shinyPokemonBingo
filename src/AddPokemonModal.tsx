import {
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  Button,
  Autocomplete,
} from "@mui/joy";
import { BingoSquare } from "./BingoBoard";
import React, { useCallback, useState } from "react";
import { BasicPokemon } from "./api/pokeapi/client";

function getOptionLabel(option: BasicPokemon): string {
  return option.name.charAt(0).toUpperCase() + option.name.slice(1);
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

  const handleSearchChange = useCallback(
    (_event: React.SyntheticEvent, newSelectedPokemon: BasicPokemon | null) => {
      if (newSelectedPokemon) {
        setSelectedPokemon(newSelectedPokemon);
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

  const handleAddPokemon = useCallback(() => {
    if (square) {
      addPokemon(
        {
          ...square,
          path: selectedPokemon?.name,
        },
        "add",
      );
    }
    setOpen(false);
    setSelectedPokemon(null);
    setSearchTerm("");
  }, [square, selectedPokemon]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalDialog>
        <DialogTitle>Add Pokemon</DialogTitle>
        <DialogContent>Square ID: {square?.id}</DialogContent>

        <Autocomplete
          autoComplete
          getOptionLabel={getOptionLabel}
          options={listOfPokemon ?? []}
          placeholder={"Search for a Pokemon!"}
          value={selectedPokemon}
          onChange={handleSearchChange}
          inputValue={searchTerm}
          onInputChange={handleSearchInputChange}
        />
        <Button onClick={handleAddPokemon}>Add Pokemon</Button>
      </ModalDialog>
    </Modal>
  );
}
