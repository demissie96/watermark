import React from "react";
import { useState } from "react";
import "./App.css";
import Canvas from "./Canvas";
import { InputToImage, ImageToCanvas, Download } from "./Functions";
import { ImageDimensions, AddWatermark } from "./Functions";
import FabricJSTest from "./FabricJSTest";

function App() {
  const [uploaded, setUploaded] = useState(false);
  const [imageHeight, setImageHeight] = useState(500);
  const [imageWidth, setImageWidth] = useState(800);

  function GroupedFunction(e) {
    InputToImage(e);
    setTimeout(() => {
      let imgProps = ImageDimensions();
      console.log(imgProps[0] + " + " + imgProps[1]);
      setImageHeight(imgProps[0]);
      setImageWidth(imgProps[1]);
      setTimeout(() => {
        setUploaded(true);
        ImageToCanvas();
      }, 500);
    }, 200);
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <input type="file" id="file" onChange={(e) => GroupedFunction(e)} />
      <button onClick={() => AddWatermark()}>AddWatermark</button>
      <div>
        <button onClick={refreshPage}>Reset</button>
      </div>
      <h3>Uploaded Image: </h3>
      <img id="my_picture" />
      {uploaded && (
        <div id="canvas-div">
          <div id="layer1">
            <FabricJSTest height={imageHeight} width={imageWidth} />
          </div>

          <button id="download" onClick={() => Download()}>
            Download
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
