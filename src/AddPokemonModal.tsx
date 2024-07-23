import {
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/joy";
import { BingoSquare } from "./BingoBoard";
import React, { useCallback } from "react";

interface ModalProps {
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
  const { square, open, setOpen, addPokemon } = props;

  const handleAddPokemon = useCallback(() => {
    if (square) {
      addPokemon(
        {
          ...square,
          path: "this is a test",
        },
        "add",
      );
    }
    setOpen(false);
  }, [square]);

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
        <DialogTitle>Testing Modal</DialogTitle>
        <DialogContent>Square ID: {square?.id}</DialogContent>
        <Button onClick={handleAddPokemon}>Add Pokemon</Button>
      </ModalDialog>
    </Modal>
  );
}
