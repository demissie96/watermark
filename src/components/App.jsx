import React from "react";
import { useState } from "react";
import "./App.css";
import Canvas from "./Canvas";
import { InputToImage, ImageToCanvas, Download } from "./Functions";
import { ImageDimensions } from "./Functions";

function App() {
  const [imageHeight, setImageHeight] = useState(500);
  const [imageWidth, setImageWidth] = useState(800);

  function GroupedFunction() {
    let imgProps = ImageDimensions();
    console.log(imgProps[0] + " + " + imgProps[1]);
    setImageHeight(imgProps[0]);
    setImageWidth(imgProps[1]);
    setTimeout(() => {
      ImageToCanvas();
    }, 500);
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <input type="file" id="file" onChange={(e) => InputToImage(e)} />
      <button onClick={() => GroupedFunction()}>Image to Canvas</button>
      <div>
        <button onClick={refreshPage}>Reset</button>
      </div>
      <h3>Uploaded Image: </h3>
      <img id="my_picture" />
      <div className="container">
        <Canvas height={imageHeight} width={imageWidth} />
      </div>

      <button id="download" onClick={() => Download()}>
        Download
      </button>
    </div>
  );
}

export default App;
