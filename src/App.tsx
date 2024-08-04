import { Stack } from "@mui/joy";
import { BingoBoard } from "./BingoBoard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "./navbar/Navbar";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack spacing={2}>
        <Navbar />
        <Stack alignItems={"center"} spacing={1}>
          <BingoBoard />
        </Stack>
      </Stack>
    </QueryClientProvider>
  );
}

export default App;
