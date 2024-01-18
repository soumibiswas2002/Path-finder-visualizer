import React from "react";
import { useEffect, useState } from "react";
import "../styles.css";
import { getInitialGrid } from "../Functions/functions";
import Node from "./Node";

const PathVisualizer = ({ grid, setgrid }) => {
  const [mouseIsPressed, setisMousePressed] = useState(false);

  useEffect(() => {
    const value = getInitialGrid(20, 50);
    setgrid(value);
  }, []);

  const handleToggleWallGrid = (grid, row, col) => {
    let nodeClassName = document.getElementById(`node-${row}-${col}`).className;
    if (
      nodeClassName !== "node node-finish" &&
      nodeClassName !== "node node-start"
    ) {
      const node = grid[row][col];
      node.isWall = !node.isWall;
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-wall";
    }
  };

  const handleMouseDown = (row, col) => {
    console.log("hi")
    handleToggleWallGrid(grid, row, col);

    setisMousePressed(true);
  };

  const handleMouseUp = () => {
    console.log("hlw")
    setisMousePressed(false)
  };

  const handleMouseEnter = (row,col) => {
    console.log("holla")
    if(!mouseIsPressed) return;
 
  }
  
  

  return (
    <div className="grid">
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="grid-row">
            {row.map((node, nodeIdx) => {
              return (
                <Node
                  node={node}
                  handleMouseDown={handleMouseDown}
                  // handleMouseUp={handleMouseUp}
                  // handleMouseEnter={handleMouseEnter}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default PathVisualizer;
