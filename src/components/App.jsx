import React from "react";
import { useState } from "react";
import "./App.css";
import { InputToImage, Download, ImageDimensions } from "./Functions";
import FabricJSTest from "./FabricJSTest";

function App() {
  const [uploaded, setUploaded] = useState(false);
  const [imageHeight, setImageHeight] = useState(500);
  const [imageWidth, setImageWidth] = useState(800);

  function GroupedFunction(e) {
    // Send uploaded image to img element
    InputToImage(e);

    setTimeout(() => {
      // Get uploaded image dimensions to set canvas size
      let imgProps = ImageDimensions();
      setImageHeight(imgProps[0]);
      setImageWidth(imgProps[1]);
      setTimeout(() => {
        // Create canvas with conditional rendering after we know the required size of it
        setUploaded(true);
      }, 500);
    }, 200);
  }

  // Reset the page to delete everything
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <input type="file" id="file" onChange={(e) => GroupedFunction(e)} />

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
