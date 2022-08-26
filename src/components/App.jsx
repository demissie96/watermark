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
    <div id="row">
      <div id="sidebar">
        <div>
          <h1 style={{ textAlign: "center" }}>Watermark</h1>
        </div>
        <div>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Image:</Form.Label>
            <Form.Control type="file" onChange={(e) => GroupedFunction(e)} />
          </Form.Group>
        </div>

        <div>
          <Form.Control
            type="text"
            placeholder="Watermark text here..."
            readOnly
          />
        </div>
        <div style={{ marginBottom: "0" }}>
          <Form.FloatingLabel>Select font:</Form.FloatingLabel>
          <Form.Select>
            <option value="arial">Arial</option>
            <option value="helvetica" selected>
              Helvetica
            </option>
            <option value="myriad pro">Myriad Pro</option>
            <option value="delicious">Delicious</option>
            <option value="verdana">Verdana</option>
            <option value="georgia">Georgia</option>
            <option value="courier">Courier</option>
            <option value="comic sans ms">Comic Sans MS</option>
            <option value="impact">Impact</option>
            <option value="monaco">Monaco</option>
            <option value="optima">Optima</option>
            <option value="hoefler text">Hoefler Text</option>
            <option value="plaster">Plaster</option>
            <option value="engagement">Engagement</option>
          </Form.Select>
        </div>
        <div style={{ display: "flex", margin: "0" }}>
          <div style={{ margin: "auto" }}>
            <InputGroup className="mb-3">
              <InputGroup.Text>Bold</InputGroup.Text>
              <InputGroup.Checkbox aria-label="Checkbox for following text input" />
            </InputGroup>
          </div>
          <div></div>
          <div style={{ margin: "auto" }}>
            <InputGroup className="mb-3">
              <InputGroup.Text>Italic</InputGroup.Text>
              <InputGroup.Checkbox aria-label="Checkbox for following text input" />
            </InputGroup>
          </div>
        </div>
        <div style={{ marginTop: "0" }}>
          <Form.Label htmlFor="exampleColorInput">Color picker:</Form.Label>
          <Form.Control
            type="color"
            id="exampleColorInput"
            defaultValue="#FFFFFF"
            title="Choose your color"
          />
        </div>

        <div>
          <p>Transparency:</p>
          <Form.Range />
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ margin: "auto" }}>
            <Button onClick={refreshPage} variant="outline-primary">
              Preview
            </Button>{" "}
          </div>
          <div style={{ margin: "auto" }}>
            <Button onClick={refreshPage} variant="primary">
              Download
            </Button>{" "}
          </div>
        </div>
        <div style={{ margin: "30px auto 10px" }} className="d-grid gap-2">
          <Button onClick={refreshPage} variant="danger">
            Reset
          </Button>{" "}
        </div>
      </div>
      <div id="workingSpace">
        <h3>Uploaded Image: </h3>
        <img id="my_picture" />
        {uploaded && (
          <div id="canvas-div">
            <div id="layer1">
              <FabricJS height={imageHeight} width={imageWidth} />
            </div>

            <button id="download" onClick={() => Download()}>
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
