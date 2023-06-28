import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

export default function Header({
  showMovies,
}: {
  showMovies: (bool: boolean) => void;
}) {
  return (
    <Box sx={{ flexGrow: 1, pt: "10px" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgba(255,255,255,0.6)",
          borderRadius: "10px",
          boxShadow:
            " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            variant="contained"
            sx={{
              flexGrow: 0.4,
              backgroundColor: "#646665",
              color: "black",
              border: "1px solid #646665",
            }}
            color="inherit"
            onClick={() => showMovies(true)}
          >
            Movies
          </Button>
          <Button
            variant="outlined"
            sx={{ flexGrow: 0.4 }}
            color="inherit"
            onClick={() => showMovies(false)}
          >
            Directors
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
