import React from "react";
import { useState } from "react";
import "./App.css";
import { InputToImage, Download, ImageDimensions } from "./Functions";
import FabricJS from "./FabricJS";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

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
    <div id="row" style={{ visibility: "visible" }}>
      <div
        id="sidebar"
        style={{
          visibility: uploaded ? "hidden" : "visible",
          position: uploaded ? "absolute" : "relative",
        }}
      >
        <div>
          <h1 style={{ textAlign: "center" }}>Watermark</h1>
        </div>
        <div>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Image:</Form.Label>
            <Form.Control type="file" onChange={(e) => GroupedFunction(e)} />
          </Form.Group>
        </div>
      </div>
      <div
        id="workingSpace"
        style={{
          margin: "auto",
        }}
      >
        <h3
          style={{
            visibility: uploaded ? "hidden" : "visible",
            position: uploaded ? "absolute" : "relative",
          }}
        >
          Watermark Editor
        </h3>
        <img id="my_picture" />
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
