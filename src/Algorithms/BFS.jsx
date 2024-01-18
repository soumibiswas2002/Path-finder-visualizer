export function bfs(grid, startNode, finishNode) {
  const VisitedNodesInOrder = [];
  let neighbouringNodes = [startNode];
  while (neighbouringNodes.length) {
    const currentNode = neighbouringNodes.shift(); // first element
    if (!currentNode.isVisited && !currentNode.isWall) {
      currentNode.isVisited = true;
      VisitedNodesInOrder.push(currentNode);
      if (currentNode === finishNode) {
       return VisitedNodesInOrder;
      }

      // Find the neighbours
      const { row, col } = currentNode;
      let nextNode;
      if (row > 0) {
        nextNode = grid[row - 1][col];
        if (!nextNode.isVisited) {
          neighbouringNodes.push(nextNode);
          nextNode.prevNode = currentNode;
        }
      }
      if (row < grid.length - 1) {
        nextNode = grid[row + 1][col];
        if (!nextNode.isVisited) {
          neighbouringNodes.push(nextNode);
          nextNode.prevNode = currentNode;
        }
      }
      if (col > 0) {
        nextNode = grid[row][col - 1];
        if (!nextNode.isVisited) {
          neighbouringNodes.push(nextNode);
          nextNode.prevNode = currentNode;
        }
      }
      if (col < grid[0].length - 1) {
        nextNode = grid[row][col + 1];
        if (!nextNode.isVisited) {
          neighbouringNodes.push(nextNode);
          nextNode.prevNode = currentNode;
        }
      }
    }
  }
  return VisitedNodesInOrder;
}
