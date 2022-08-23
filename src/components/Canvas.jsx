import React from "react";

function Canvas({ height, width }) {

  return (
    <canvas
      id="myCanvas"
      height={height}
      width={width}
      style={{ border: "1px solid black" }}
    />
  );
};

export default Canvas;
