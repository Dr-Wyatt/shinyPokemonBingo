import { Stack, Typography } from "@mui/joy";
import { BingoBoard } from "./BingoBoard";

function App() {
  return (
    <Stack alignItems={"center"} spacing={1}>
      <Typography level={"h1"}>Shiny Pokemon Bingo</Typography>
      <BingoBoard />
    </Stack>
  );
}

export default App;
