import { Stack, Typography } from "@mui/joy";
import { BingoBoard } from "./BingoBoard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack alignItems={"center"} spacing={1}>
        <Typography level={"h1"}>Shiny Pokemon Bingo</Typography>
        <BingoBoard />
      </Stack>
    </QueryClientProvider>
  );
}

export default App;
