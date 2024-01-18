import { bfs } from "../Algorithms/BFS";
import { dfs } from "../Algorithms/DFS";
import { dijsktra } from "../Algorithms/Dijsktra";

export const Start_row = 5;
export const Start_col = 10;
export const End_row = 17;
export const End_col = 23;

// Handle Clear of Grid of algo

export function handleClearGrid(grid) {
  for (let row of grid) {
    for (let node of row) {
      let nodeClassName = document.getElementById(
        `node-${node.row}-${node.col}`
      ).className;
      if (
        nodeClassName !== "node node-finish" &&
        nodeClassName !== "node node-start"
      ) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node";
      }
      node.isVisited = false;
      node.prevNode = null;
      node.distance = Infinity;
    }
  }
}

// Handle Visualization Of Algorithms

export const handleVisualization = (algo, grid, speed) => {
  // Start Node
  const startNode = grid[Start_row][Start_col];

  // End Node
  const finishNode = grid[End_row][End_col];

  let VisitedNodesInOrder;
  let value = 0;

  switch (speed) {
    case "Slow":
      value = 100;
      break;
    case "Average":
      value = 40;
      break;
    case "Fast":
      value = 20;
      break;
    default:
      return;
  }

  switch (algo) {
    case "Dijkstra":
      VisitedNodesInOrder = dijsktra(grid, startNode, finishNode);
      break;
    case "BFS":
      VisitedNodesInOrder = bfs(grid, startNode, finishNode);
      break;
    case "DFS":
      VisitedNodesInOrder = dfs(grid, startNode, finishNode);
      break;
    default:
      return;
  }

  const shortestNodesInOrder = getShortestNode(finishNode);
  animateNode(VisitedNodesInOrder, value, shortestNodesInOrder);
};

// Animate the visited Nodes

const animateNode = (visitedNodes, value, shortestNodesInOrder) => {
  for (let i = 0; i <= visitedNodes.length; i++) {
    if (i === visitedNodes.length) {
      setTimeout(() => {
        animateShortestPath(shortestNodesInOrder);
      }, value * i);
      return;
    }
    setTimeout(() => {
      const node = visitedNodes[i];
      const className = document.getElementById(
        `node-${node.row}-${node.col}`
      ).className;
      if (className !== "node node-finish" && className != "node node-start") {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }
    }, value * i);
  }
};

// Animate Shortest path

const animateShortestPath = (shortestNodesInOrder) => {
  console.log(shortestNodesInOrder);
  for (let i = 0; i < shortestNodesInOrder.length; i++) {
    setTimeout(() => {
      const node = shortestNodesInOrder[i];
      const className = document.getElementById(
        `node-${node.row}-${node.col}`
      ).className;
      if (className !== "node node-finish" && className !== "node node-start") {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortestpath";
      }
    }, 40 * i);
  }
};

// Get the shortest Node by backtracking

const getShortestNode = (node) => {
  let ShortestNodes = [];
  let currentNode = node;
  while (currentNode != null) {
    ShortestNodes.unshift(currentNode);
    currentNode = currentNode.prevNode;
  }
  return ShortestNodes;
};

export function getInitialGrid(rowCount, colCount) {
  const Initial_Grid = [];
  for (let row = 0; row < rowCount; row++) {
    const curr = [];
    for (let col = 0; col < colCount; col++) {
      curr.push(createNode(row, col));
    }

    Initial_Grid.push(curr);
  }
  return Initial_Grid;
}

// create A Node

const createNode = (row, col) => {
  return {
    row,
    col,
    isinitStart: row === Start_row && col === Start_col, // For the initial starting object identification
    isinitFinish: row === End_row && col === End_col, // For the initial ending object identification
    distance: Infinity,
    isVisited: false,
    prevNode: null,
    isWall: false,
  };
};

/* ** Dijsktra Algo ** */

// Get All Nodes Of Grid

export const getAllNodes = (grid) => {
  const nodes = [];
  for (let row of grid) {
    for (let node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

// Sort All Nodes By Distance (Custom Sort Function)

export const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((a, b) => a.distance - b.distance);
};

// Update the neighbouring Nodes

export const UpdateNeighbouringNodes = (node, grid) => {
  const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
  for (const neighbour of unvisitedNeighbours) {
    neighbour.distance = node.distance + 1;
    neighbour.prevNode = node;
  }
};

// get unvisitedNeighbours

const getUnvisitedNeighbours = (node, grid) => {
  const neighbours = [];
  const { row, col } = node;
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours.filter((neighbour) => !neighbour.isVisited);
};
