// Return All Nodes in the order in which they are visited
// Make nodes point back to the previous node so that we can get the shortest path by backtracking from the finish node
import {
  getAllNodes,
  sortNodesByDistance,
  UpdateNeighbouringNodes,
} from "../Functions/functions";

// Dijsktra Algo

export function dijsktra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift(); // get the first element from the sorted array
    if (closestNode.isWall) {
      continue;
    }
    // if the closest Node is at distance infinity that means we are trapped
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true; // Mark the node as visited
    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) {
      return visitedNodesInOrder;
    }

    UpdateNeighbouringNodes(closestNode, grid);
  }
}
