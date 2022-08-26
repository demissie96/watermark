import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import { InputToImage, Download, ImageDimensions } from "./Functions";
import "./FabricJS.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

function FabricJS({ height, width }) {
  // Define a state variable to store and access the fabric.Canvas object
  const [canvas, setCanvas] = useState("");

  // Opacity
  const [opacity, setOpacity] = useState(0.5);
  // Transparency
  const [transparency, setTransparency] = useState(50);

  // Create a function that returns a fabric.Canvas object
  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 500,
      width: 800,
      backgroundColor: null,
    });

  // Invoke the function upon initial rendering of the DOM
  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  // Add text to the canvas
  function Draw() {
    var text = new fabric.Textbox("Watermark...", {
      fill: "red",
      fontSize: 40,
      width: 250,
      cursorColor: "blue",
      opacity: opacity,
      top: 20,
      left: 20,
      fontStyle: "normal",
      fontWeight: "normal",
      fontFamily: "arial",
    });
    canvas.add(text);
  }

  // Add canvas a background image
  function AddImage() {
    // Create an image instance
    var imgElement = document.getElementById("my_picture");
    var imgInstance = new fabric.Image(imgElement, {
      left: 0,
      top: 0,
      angle: 0,
      opacity: 1,
    });
    // Make the image fit into the canvas
    canvas.setWidth(imgInstance.width);
    canvas.setHeight(imgInstance.height);
    canvas.setBackgroundImage(imgInstance, canvas.renderAll.bind(canvas), {
      scaleX: canvas.width / imgInstance.width,
      scaleY: canvas.height / imgInstance.height,
    });
  }

  // Change the opacity with slider
  function Slider(event) {
    setOpacity(event.target.value / -100);
    // Calculate transparency from opacity value
    let x = 100 - event.target.value * -1;
    setTransparency(x);
    ChangeOpacity();
  }

  function ChangeOpacity() {
    let currentObject = canvas.getActiveObject();
    // Set your new property values
    currentObject.opacity = opacity;
    // Then you mark the object as "dirty" and render the canvas:
    currentObject.dirty = true;
    canvas.renderAll();
  }

  // Delete selected canvas object
  function DeleteObject() {
    canvas.remove(canvas.getActiveObject());
  }

  // Reset the page to delete everything
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      <div id="rowFabric">
        <div id="sidebarFabric">
          <h1>Test FabricJS</h1>
          <div style={{ margin: "30px auto 10px" }} className="d-grid gap-2">
            <Button onClick={refreshPage} variant="danger">
              Reset
            </Button>{" "}
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
            <Form.Range
              defaultValue="-50"
              min="-100"
              max="-1"
              onChange={(event) => Slider(event)}
              onClick={(event) => Slider(event)}
            />
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ margin: "auto" }}>
              <Button onClick={null} variant="outline-primary">
                Preview
              </Button>{" "}
            </div>
            <div style={{ margin: "auto" }}>
              <Button onClick={() => Download()} variant="primary">
                Download
              </Button>{" "}
            </div>
          </div>
        </div>

        <div id="workingSpace" style={{ margin: "auto" }}>
          <button type="button" onClick={() => Draw()}>
            Draw
          </button>
          <button type="button" onClick={() => DeleteObject()}>
            Delete
          </button>
          <button type="button" onClick={() => AddImage()}>
            Add Image
          </button>
          <button
            type="button"
            onClick={() => canvas.discardActiveObject().renderAll()}
          >
            Deactivate
          </button>
          <h3>Transparency: {transparency}%</h3>
          <div>
            <canvas
              id="canvas"
              width={height}
              height={width}
              style={{
                border: "1px solid #000000",
                // Set the aspect ratio of the picture to prevent stretching
                maxWidth: `${500 * (width / height)}px`,
                maxHeight: "500px",
              }}
            ></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

export default FabricJS;
