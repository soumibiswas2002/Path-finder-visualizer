import React from "react";

const Node = ({ node, handleMouseDown }) => {
  const extractClassName = node.isinitFinish
    ? "node-finish"
    : node.isinitStart
    ? "node-start"
    : "";

  return (
    <div
      id={`node-${node.row}-${node.col}`}
      className={`node ${extractClassName}`}
      onMouseDown={()=>handleMouseDown(node.row, node.col)}
    ></div>
  );
};

export default Node;
