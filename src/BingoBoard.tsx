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
  Typography,
} from "@mui/joy";
import React, { useCallback, useRef, useState } from "react";
import { AddPokemonModal } from "./AddPokemonModal";
import { EditPokemonModal } from "./EditPokemonModal";
import html2canvas from "html2canvas";
import { BingoSquareWrapper } from "./BingoSquareWrapper";

import { useQuery } from "@tanstack/react-query";
import { PokeApiClient } from "./api/pokeapi/client";

export interface BingoSquare {
  id: string;
  status: "not_found" | "found" | "hunting";
  name?: string;
  path?: string;
  game?: string;
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
function getMinWidth(numberOfRows: number): number {
  switch (numberOfRows) {
    case 3:
      return 120;
    case 5:
      return 75;
    default:
      return 120;
  }
}

function getBackGroundColor(status: BingoSquare["status"]): string | undefined {
  switch (status) {
    case "found":
      return "lightGreen";
    case "hunting":
      return "orange";
    case "not_found":
      return undefined;
    default:
      return undefined;
  }
}

export function BingoBoard(): React.JSX.Element {
  const exportRef = useRef();

  const [bingoBoard, setBingoBoard] = useState<BingoBoardType>(
    createBingoBoard(5),
  );
  const [numberOfRows, setNumberOfRows] = useState<number>(bingoBoard.length);

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedSquare, setSelectedSquare] = useState<
    BingoSquare | undefined
  >();

  const query = useQuery({
    queryKey: ["allPokemon"],
    queryFn: () => PokeApiClient.getAllPokemon(),
  });

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

  const handleReset = useCallback(() => {
    setBingoBoard(createBingoBoard(numberOfRows));
  }, [numberOfRows]);

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
        defaultValue={5}
        onChange={handleNumberOfBoxes}
        value={numberOfRows}
      >
        <Option value={3}>3</Option>
        <Option value={5}>5</Option>
      </Select>

      <Box ref={exportRef}>
        <Stack direction={"row"}>
          {Array.from("SHINY").map((value, index) => (
            <BingoSquareWrapper
              key={value}
              bingoSquareID={`${value}-${index}`}
              sx={{ minWidth: bingoBoard.length === 3 ? 72 : 75 }}
            >
              <Typography level="h1" color="primary">
                {value}
              </Typography>
            </BingoSquareWrapper>
          ))}
        </Stack>
        {bingoBoard.map((row, rowIndex) => (
          <Stack key={`row-${rowIndex}`} direction={"row"}>
            {row.map((bingoSquare, index) => (
              <BingoSquareWrapper
                key={bingoSquare.id}
                bingoSquareID={bingoSquare.id}
                sx={{
                  minWidth: getMinWidth(bingoBoard.length),
                  backgroundColor: getBackGroundColor(bingoSquare.status),
                }}
              >
                {(bingoBoard.length === 3 && bingoSquare.id === "1-1") ||
                (bingoBoard.length === 5 && bingoSquare.id === "2-2") ? (
                  <Box sx={{ backgroundColor: "lightGreen" }}>Bonus</Box>
                ) : bingoSquare.path ? (
                  <Button
                    key={`${rowIndex}-${index}-edit-button`}
                    sx={{ border: "none", "&:hover": { borderRadius: 0 } }}
                    color="neutral"
                    variant="outlined"
                    onClick={handleOnClick(bingoSquare, "edit")}
                  >
                    <Box>
                      <img
                        src={bingoSquare?.path}
                        max-width="75px"
                        max-height="75px"
                      />
                    </Box>
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

      <Stack direction={"row"} spacing={2}>
        <Button
          color="danger"
          variant="outlined"
          size={"lg"}
          onClick={handleReset}
        >
          Reset
        </Button>
        <Dropdown>
          <MenuButton size={"lg"}>Export as...</MenuButton>
          <Menu>
            <MenuItem onClick={handleExport("png")}>PNG</MenuItem>
            <MenuItem onClick={handleExport("jpg")}>JPG</MenuItem>
          </Menu>
        </Dropdown>
      </Stack>
      <AddPokemonModal
        square={selectedSquare}
        open={openAddModal}
        setOpen={setOpenAddModal}
        addPokemon={handlePokemon}
        listOfPokemon={query.data?.results}
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
