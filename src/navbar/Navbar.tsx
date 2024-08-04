import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/joy";

import React from "react";

import MenuIcon from "@mui/icons-material/Menu";

import PokemonBall from "../../public/pokeball-png-45330.png";

export function Navbar(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(inOpen);
    };
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={1}
    >
      <IconButton size="sm" variant={"plain"}>
        <img src={PokemonBall} width={32} height={32} />
      </IconButton>
      <Typography level={"h1"}>Shiny Pokemon Bingo</Typography>
      <IconButton size="sm" variant={"plain"} onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor={"right"}
        sx={{
          "& .MuiDrawer-content": { maxWidth: 200 },
        }}
      >
        <Box role="presentation">
          <List>
            {["Login", "Profile", "Signup"].map((text) => (
              <ListItem key={text}>
                <ListItemButton>{text}</ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem>
              <AccordionGroup sx={{ border: "none" }}>
                <Accordion sx={{ border: "none" }}>
                  <AccordionSummary
                    sx={{
                      paddingLeft: 0,
                      "& .MuiAccordionSummary-button": {
                        border: "none",
                      },
                    }}
                  >
                    Your Boards
                  </AccordionSummary>
                  {["First Board", "Second Board", "Third Board"].map(
                    (boardName) => (
                      <AccordionDetails key={boardName}>
                        {boardName}
                      </AccordionDetails>
                    ),
                  )}
                </Accordion>
              </AccordionGroup>
            </ListItem>
            <ListItem>
              <ListItemButton>{"Logout"}</ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Stack>
  );
}
