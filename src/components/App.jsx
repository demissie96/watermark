import React from "react";
import { useState } from "react";
import "./App.css";
import {
  ImageDimensions,
  ImageToResize,
  InputToFirstImage,
  CanvasToSecondImage,
} from "./Functions";
import FabricJS from "./FabricJS";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { RiPenNibFill } from "react-icons/ri";

function App() {
  const [uploaded, setUploaded] = useState(false);
  const [imageHeight, setImageHeight] = useState(500);
  const [imageWidth, setImageWidth] = useState(800);

  // Set up editor upon upload image
  function GroupedFunction(e) {
    InputToFirstImage(e, (width, height) => {
      ImageToResize(width, height, (canvas) => {
        CanvasToSecondImage(canvas, () => {
          // Get uploaded image dimensions to set canvas size
          let imgProps = ImageDimensions();
          setImageHeight(imgProps[0]);
          setImageWidth(imgProps[1]);

          // Create canvas with conditional rendering after we know the required size of it
          setUploaded(true);
        });
      });
    });
  }

  return (
    <div id="row" style={{ visibility: "visible" }}>
      <div
        id="sidebar"
        style={{
          visibility: uploaded ? "hidden" : "visible",
          position: uploaded ? "absolute" : "relative",
        }}
      >
        <div>
          <h1 style={{ textAlign: "center" }}>
            <RiPenNibFill /> Watermark
          </h1>
        </div>
        <div>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Image:</Form.Label>
            <Form.Control type="file" onChange={(e) => GroupedFunction(e)} />
          </Form.Group>
        </div>
        <div style={{ visibility: "hidden"}}>
          {/* For preload fonts to the browser */}
          <p style={{ fontFamily: "'DM Serif Display', serif" }}>.</p>
          <p style={{ fontFamily: "'Dancing Script', cursive" }}>.</p>
          <p style={{ fontFamily: "'Ubuntu', sans-serif" }}>.</p>
        </div>
      </div>
      <div
        id="workingSpace"
        style={{
          margin: "auto",
        }}
      >
        <img
          id="first_place"
          alt="first-img"
          style={{ visibility: "hidden", position: "absolute" }}
        />
        <div
          style={{
            visibility: uploaded ? "hidden" : "visible",
            position: uploaded ? "absolute" : "relative",
          }}
        >
          <RiPenNibFill style={{ fontSize: "140px", color: "red" }} />
        </div>

        {uploaded && (
          <div id="canvas-div">
            <div id="layer1">
              <FabricJS height={imageHeight} width={imageWidth} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
