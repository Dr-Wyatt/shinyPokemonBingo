import {
  AspectRatio,
  Select,
  Stack,
  Option,
  Button,
  FormLabel,
  Box,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
} from "@mui/joy";
import React, { useCallback, useState } from "react";

interface BingoSquare {
  id: string;
  status: "not_found" | "found" | "hunting";
  path?: string;
}

type BingoBoardType = Array<Array<BingoSquare>>;

function createBingoBoard(numberOfRows: number): BingoBoardType {
  return Array.from({ length: numberOfRows }).map((_value, rowIndex) =>
    Array.from({ length: numberOfRows }).map((_value, squareIndex) => {
      return {
        id: `${rowIndex}-${squareIndex}`,
        status: "not_found",
      };
    }),
  );
}

function getMinWidth(numberOfRows: number): number {
  switch (numberOfRows) {
    case 3:
      return 120;
    case 4:
      return 90;
    case 5:
      return 75;
    default:
      return 100;
  }
}

interface ModalProps {
  square: BingoSquare | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line no-unused-vars
  addPokemon: (updatedSquare: BingoSquare) => void;
}

function AddPokemonModal(props: ModalProps): React.JSX.Element {
  const { square, open, setOpen: handleClose, addPokemon } = props;

  const handleAddPokemon = useCallback(() => {
    if (square) {
      addPokemon({
        ...square,
        path: "this is a test",
      });
    }
    handleClose(false);
  }, [square]);

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

export function BingoBoard(): React.JSX.Element {
  const [numberOfRows, setNumberOfRows] = useState<number>(3);

  const [bingoBoard, setBingoBoard] = useState(createBingoBoard(numberOfRows));

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedSquare, setSelectedSquare] = useState<
    BingoSquare | undefined
  >();

  const handleNumberOfBoxes = useCallback(
    (_event: React.SyntheticEvent | null, newValue: number | null) => {
      if (newValue) {
        setNumberOfRows(newValue);
        setBingoBoard(createBingoBoard(newValue));
      }
    },
    [],
  );

  const handleAddPokemon = useCallback(
    (updatedSquare: BingoSquare) => {
      const newBingoBoard = bingoBoard.map((row) =>
        row.map((square) => {
          if (square.id === updatedSquare.id) {
            return updatedSquare;
          }
          return square;
        }),
      );

      console.log("this is newBingoBoard", newBingoBoard);

      setBingoBoard(newBingoBoard);
      setOpenModal(false);
    },
    [bingoBoard],
  );

  const handleOnClick = useCallback(
    (square: BingoSquare) => () => {
      setSelectedSquare(square);
      setOpenModal(true);
    },
    [],
  );

  return (
    <Stack spacing={1} alignItems={"center"}>
      <FormLabel
        htmlFor="select-number-of-rows"
        id="select-number-of-rows-label"
      >
        Select your number of rows and columns
      </FormLabel>
      <Select
        slotProps={{
          button: {
            id: "select-number-of-rows",
            "aria-labelledby":
              "select-number-of-rows-label select-number-of-rows",
          },
        }}
        defaultValue={3}
        onChange={handleNumberOfBoxes}
        value={numberOfRows}
      >
        <Option value={3}>3</Option>
        <Option value={4}>4</Option>
        <Option value={5}>5</Option>
      </Select>

      <Box>
        {bingoBoard.map((row, rowIndex) => (
          <Stack key={`row-${rowIndex}`} direction={"row"}>
            {row.map((bingoSquare, index) => (
              <AspectRatio
                id={bingoSquare.id}
                key={`${rowIndex}-${index}`}
                ratio={"1/1"}
                variant="outlined"
                sx={{ minWidth: getMinWidth(bingoBoard.length) }}
              >
                {bingoSquare.path ? (
                  <Button
                    key={`${rowIndex}-${index}-edit-button`}
                    sx={{ border: "none", "&:hover": { borderRadius: 0 } }}
                    color="neutral"
                    variant="outlined"
                    onClick={handleOnClick(bingoSquare)}
                  >
                    bingoSquare.path
                  </Button>
                ) : (
                  <Button
                    key={`${rowIndex}-${index}-add-button`}
                    sx={{ border: "none", "&:hover": { borderRadius: 0 } }}
                    color="neutral"
                    variant="outlined"
                    onClick={handleOnClick(bingoSquare)}
                  >
                    Add your Pokemon!
                  </Button>
                )}
              </AspectRatio>
            ))}
          </Stack>
        ))}
      </Box>

      <Button size="sm" variant="solid">
        Save
      </Button>
      <AddPokemonModal
        square={selectedSquare}
        open={openModal}
        setOpen={setOpenModal}
        addPokemon={handleAddPokemon}
      />
    </Stack>
  );
}

{
  /* <Grid container justifyContent={"center"}>
        <AspectRatio ratio={"1/1"} variant="outlined" sx={{ minWidth: 100 }}>
          <Grid xs={4}>Grid Test 1</Grid>
        </AspectRatio>
        <AspectRatio ratio={"1/1"} variant="outlined" sx={{ minWidth: 100 }}>
          <Grid xs={4}>Grid Test 2</Grid>
        </AspectRatio>
        <AspectRatio ratio={"1/1"} variant="outlined" sx={{ minWidth: 100 }}>
          <Grid xs={4}>Grid Test 3</Grid>
        </AspectRatio>

        <AspectRatio ratio={"1/1"} variant="outlined" sx={{ minWidth: 100 }}>
          <Grid xs={4}>Grid Test 1</Grid>
        </AspectRatio>
        <AspectRatio ratio={"1/1"} variant="outlined" sx={{ minWidth: 100 }}>
          <Grid xs={4}>Grid Test 2</Grid>
        </AspectRatio>
        <AspectRatio ratio={"1/1"} variant="outlined" sx={{ minWidth: 100 }}>
          <Grid xs={4}>Grid Test 3</Grid>
        </AspectRatio>

        <AspectRatio ratio={"1/1"} variant="outlined" sx={{ minWidth: 100 }}>
          <Grid xs={4}>Grid Test 1</Grid>
        </AspectRatio>
        <AspectRatio ratio={"1/1"} variant="outlined" sx={{ minWidth: 100 }}>
          <Grid xs={4}>Grid Test 2</Grid>
        </AspectRatio>
        <AspectRatio ratio={"1/1"} variant="outlined" sx={{ minWidth: 100 }}>
          <Grid xs={4}>Grid Test 3</Grid>
        </AspectRatio>
      </Grid> */
}
