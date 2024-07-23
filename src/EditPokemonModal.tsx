import {
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  Button,
  ButtonGroup,
} from "@mui/joy";
import { BingoSquare } from "./BingoBoard";
import React, { useCallback } from "react";

interface ModalProps {
  square: BingoSquare | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editStatus: (
    // eslint-disable-next-line no-unused-vars
    updatedSquare: BingoSquare,
    // eslint-disable-next-line no-unused-vars
    updateType: "add" | "statusUpdate",
  ) => void;
}

export function EditPokemonModal(props: ModalProps): React.JSX.Element {
  const { square, open, setOpen, setAddOpen, editStatus } = props;

  const handleChangePokemon = useCallback(() => {
    setOpen(false);
    setAddOpen(true);
  }, [square]);

  const handleEditStatus = useCallback(
    (status: BingoSquare["status"]) => () => {
      if (square) {
        editStatus(
          {
            ...square,
            status: status,
          },
          "statusUpdate",
        );
      }
    },
    [square],
  );

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
        <DialogContent>
          <Button onClick={handleChangePokemon}>Change Pokemon</Button>
          <ButtonGroup variant="soft" aria-label="soft button group">
            <Button onClick={handleEditStatus("not_found")}>Not Found</Button>
            <Button onClick={handleEditStatus("found")}>Found</Button>
            <Button onClick={handleEditStatus("hunting")}>Hunting</Button>
          </ButtonGroup>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
