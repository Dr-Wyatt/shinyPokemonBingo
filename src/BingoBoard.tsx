import {
  Select,
  Stack,
  Option,
  Button,
  FormLabel,
  Box,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
} from "@mui/joy";
import React, { useCallback, useRef, useState } from "react";
import { AddPokemonModal } from "./AddPokemonModal";
import { EditPokemonModal } from "./EditPokemonModal";
import html2canvas from "html2canvas";
import { BingoSquareWrapper } from "./BingoSquareWrapper";

export interface BingoSquare {
  id: string;
  status: "not_found" | "found" | "hunting";
  path?: string;
}

export type BingoBoardType = Array<Array<BingoSquare>>;

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

export function BingoBoard(): React.JSX.Element {
  const exportRef = useRef();

  const [bingoBoard, setBingoBoard] = useState<BingoBoardType>(
    createBingoBoard(3),
  );
  const [numberOfRows, setNumberOfRows] = useState<number>(bingoBoard.length);

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
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

  const handlePokemon = useCallback(
    (updatedSquare: BingoSquare, updateType: "add" | "statusUpdate") => {
      const newBingoBoard = bingoBoard.map((row) =>
        row.map((square) => {
          if (square.id === updatedSquare.id) {
            return updatedSquare;
          }
          return square;
        }),
      );

      setBingoBoard(newBingoBoard);

      if (updateType === "add") {
        setOpenAddModal(false);
      } else if (updateType === "statusUpdate") {
        setOpenEditModal(false);
      }
    },
    [bingoBoard],
  );

  const handleOnClick = useCallback(
    (square: BingoSquare, type: "add" | "edit") => () => {
      setSelectedSquare(square);

      if (type === "add") {
        setOpenAddModal(true);
      } else if (type === "edit") {
        setOpenEditModal(true);
      }
    },
    [],
  );

  const handleExport = useCallback(
    (fileType: string | null) => async () => {
      const element = exportRef.current;

      const fileEnding = fileType ?? "png";

      if (element) {
        const canvas = await html2canvas(element);

        const data = canvas.toDataURL(`image/${fileEnding}`);
        const link = document.createElement("a");

        if (typeof link.download === "string") {
          link.href = data;
          link.download = `image.${fileEnding}`;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          window.open(data);
        }
      }
    },
    [exportRef],
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
        <Option value={5}>5</Option>
      </Select>

      <Box ref={exportRef}>
        {bingoBoard.map((row, rowIndex) => (
          <Stack key={`row-${rowIndex}`} direction={"row"}>
            {row.map((bingoSquare, index) => (
              <BingoSquareWrapper
                bingoBoard={bingoBoard}
                bingoSquare={bingoSquare}
              >
                {(bingoBoard.length === 3 && bingoSquare.id === "1-1") ||
                (bingoBoard.length === 5 && bingoSquare.id === "2-2") ? (
                  <Box>Bonus</Box>
                ) : bingoSquare.path ? (
                  <Button
                    key={`${rowIndex}-${index}-edit-button`}
                    sx={{ border: "none", "&:hover": { borderRadius: 0 } }}
                    color="neutral"
                    variant="outlined"
                    onClick={handleOnClick(bingoSquare, "edit")}
                  >
                    {bingoSquare.path}
                    {bingoSquare.status}
                  </Button>
                ) : (
                  <Button
                    key={`${rowIndex}-${index}-add-button`}
                    sx={{ border: "none", "&:hover": { borderRadius: 0 } }}
                    color="neutral"
                    variant="outlined"
                    onClick={handleOnClick(bingoSquare, "add")}
                  >
                    Add your Pokemon!
                  </Button>
                )}
              </BingoSquareWrapper>
            ))}
          </Stack>
        ))}
      </Box>

      <Dropdown>
        <MenuButton size={"lg"}>Export as...</MenuButton>
        <Menu>
          <MenuItem onClick={handleExport("png")}>PNG</MenuItem>
          <MenuItem onClick={handleExport("jpg")}>JPG</MenuItem>
        </Menu>
      </Dropdown>
      <AddPokemonModal
        square={selectedSquare}
        open={openAddModal}
        setOpen={setOpenAddModal}
        addPokemon={handlePokemon}
      />
      <EditPokemonModal
        square={selectedSquare}
        open={openEditModal}
        setOpen={setOpenEditModal}
        setAddOpen={setOpenAddModal}
        editStatus={handlePokemon}
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
