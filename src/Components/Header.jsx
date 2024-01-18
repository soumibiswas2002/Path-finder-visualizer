import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DropDownMenu from "./AlgoDropDown";
import { handleClearGrid, handleVisualization } from "../Functions/functions";
import SpeedDropDownMenu from "./SpeedDropDown";

export default function Header({ grid }) {
  // useState
  const [value, setValue] = React.useState("");
  const [speed, setspeed] = React.useState("");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#34495e" }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">Pathfinding Visualizer</Typography>
          <DropDownMenu value={value} setValue={setValue} />

          <Button
            variant="contained"
            type="button"
            onClick={(e) => {
              handleVisualization(value, grid, speed);
            }}
          >
            Visualize!
          </Button>
          <SpeedDropDownMenu value={speed} setValue={setspeed} />
          <Button
            variant="contained"
            type="button"
            onClick={(e) => {
              handleClearGrid(grid);
            }}
          >
            Clear Grid
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
