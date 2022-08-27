import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import { Download } from "./Functions";
import "./FabricJS.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { RiPenNibFill } from "react-icons/ri";

function FabricJS({ height, width }) {
  // Define a state variable to store and access the fabric.Canvas object
  const [canvas, setCanvas] = useState("");

  // Opacity
  const [opacity, setOpacity] = useState(0.5);
  // Transparency
  const [transparency, setTransparency] = useState(50);
  // Font style
  const [bold, setBold] = useState("normal");
  const [italic, setItalic] = useState("normal");
  const [fontName, setFontName] = useState("arial");
  const [color, setColor] = useState("#FFFFFF");
  // Watermark text
  const [watermarkText, setWatermarkText] = useState("Watermark...");

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
    setTimeout(() => {
      // Click hidden button to add image to canvas as a background
      document.getElementById("addImage").click();
    }, 1000);
  }, []);

  // Add text to the canvas
  function Draw() {
    var text = new fabric.Textbox(watermarkText, {
      fill: color,
      fontSize: 60,
      width: 350,
      cursorColor: "blue",
      opacity: opacity,
      top: 20,
      left: 20,
      fontStyle: italic,
      fontWeight: bold,
      fontFamily: fontName,
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
    if (currentObject != null) {
      // Set your new property values
      currentObject.opacity = opacity;
      // Then you mark the object as "dirty" and render the canvas:
      currentObject.dirty = true;
      canvas.renderAll();
    }
  }

  // Delete selected canvas object
  function DeleteObject() {
    canvas.remove(canvas.getActiveObject());
  }

  // Reset the page to delete everything
  function refreshPage() {
    window.location.reload(false);
  }

  // Change font weight
  function ChangeFontWeight(clicked) {
    var fontWeight;
    if (clicked === true) {
      fontWeight = "bold";
      setBold("bold");
    } else {
      fontWeight = "normal";
      setBold("normal");
    }
    let currentObject = canvas.getActiveObject();
    if (currentObject != null) {
      // Set your new property values
      currentObject.fontWeight = fontWeight;
      // Then you mark the object as "dirty" and render the canvas:
      currentObject.dirty = true;
      canvas.renderAll();
    }
  }

  // Change font style
  function ChangeFontStyle(clicked) {
    var fontStyle;
    if (clicked === true) {
      fontStyle = "italic";
      setItalic("italic");
    } else {
      fontStyle = "normal";
      setItalic("normal");
    }
    let currentObject = canvas.getActiveObject();
    if (currentObject != null) {
      // Set your new property values
      currentObject.fontStyle = fontStyle;
      // Then you mark the object as "dirty" and render the canvas:
      currentObject.dirty = true;
      canvas.renderAll();
    }
  }

  // Change font family
  function ChangeFontFamily(fontFamilyName) {
    setFontName(fontFamilyName);
    let currentObject = canvas.getActiveObject();
    if (currentObject != null) {
      // Set your new property values
      currentObject.fontFamily = fontFamilyName;
      // Then you mark the object as "dirty" and render the canvas:
      currentObject.dirty = true;
      canvas.renderAll();
    }
  }

  // Change color
  function ChangeColor(colorHash) {
    setColor(colorHash);
    let currentObject = canvas.getActiveObject();
    if (currentObject != null) {
      // Set your new property values
      currentObject.fill = colorHash;
      // Then you mark the object as "dirty" and render the canvas:
      currentObject.dirty = true;
      canvas.renderAll();
    }
  }

  // Change watermark text
  function ChangeText(input) {
    setWatermarkText(input);
    let currentObject = canvas.getActiveObject();
    if (currentObject != null) {
      // Set your new property values
      currentObject.text = input;
      // Then you mark the object as "dirty" and render the canvas:
      currentObject.dirty = true;
      canvas.renderAll();
    }
  }

  return (
    <>
      <div id="rowFabric" style={{ maxHeight: "100vh", maxWidth: "100vw" }}>
        <div id="sidebarFabric">
          <div>
            <h1 style={{ textAlign: "center" }}>
              <RiPenNibFill /> Watermark
            </h1>
          </div>
          <div style={{ margin: "30px auto 10px" }} className="d-grid gap-2">
            <Button onClick={refreshPage} variant="danger">
              Reset
            </Button>{" "}
          </div>
          <div>
            <Form.Control
              type="text"
              placeholder="Watermark text here..."
              onChange={(e) => ChangeText(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "0" }}>
            <Form.FloatingLabel>Select font:</Form.FloatingLabel>
            <Form.Select
              defaultValue={"arial"}
              onChange={(e) => ChangeFontFamily(e.target.value)}
            >
              <option value="arial">Arial</option>
              <option value="times new roman">Times New Roman</option>
            </Form.Select>
          </div>
          <div style={{ display: "flex", margin: "0" }}>
            <div style={{ margin: "auto" }}>
              <InputGroup className="mb-3">
                <InputGroup.Text>Bold</InputGroup.Text>
                <InputGroup.Checkbox
                  aria-label="Checkbox"
                  onClick={(e) => ChangeFontWeight(e.target.checked)}
                />
              </InputGroup>
            </div>
            <div></div>

            <div style={{ margin: "auto" }}>
              <InputGroup className="mb-3">
                <InputGroup.Text>Italic</InputGroup.Text>
                <InputGroup.Checkbox
                  aria-label="Checkbox"
                  onClick={(e) => ChangeFontStyle(e.target.checked)}
                />
              </InputGroup>
            </div>
          </div>
          <div style={{ marginTop: "0", display: "flex" }}>
            <p style={{ margin: "auto 0" }}>Color picker:</p>
            <Form.Control
              type="color"
              id="exampleColorInput"
              defaultValue="#FFFFFF"
              title="Choose your color"
              style={{ margin: "0 20px 0" }}
              onChange={(e) => ChangeColor(e.target.value)}
            />
          </div>

          <div>
            <p>Transparency: {transparency}%</p>
            <Form.Range
              defaultValue="-50"
              min="-100"
              max="-1"
              onChange={(event) => Slider(event)}
              onClick={(event) => Slider(event)}
            />
          </div>
          <p>Add Watermark or delete selected element:</p>
          <div style={{ display: "flex", marginTop: "0" }}>
            <div style={{ margin: "auto" }}>
              <Button onClick={() => Draw()} variant="outline-primary">
                Add
              </Button>{" "}
            </div>
            <div style={{ margin: "auto" }}>
              <Button onClick={() => DeleteObject()} variant="outline-primary">
                Delete
              </Button>{" "}
            </div>
          </div>
          <div style={{ margin: "20px auto 10px" }} className="d-grid gap-2">
            <Button
              onClick={() => {
                canvas.discardActiveObject().renderAll();
                Download();
              }}
              variant="primary"
            >
              Download
            </Button>{" "}
          </div>
        </div>

        <div id="workingSpace" style={{ margin: "3%", alignContent: "center" }}>
          <button
            id="addImage"
            style={{ position: "absolute", visibility: "hidden" }}
            type="button"
            onClick={() => AddImage()}
          >
            Add Image
          </button>
          <div>
            <canvas
              id="canvas"
              width={height}
              height={width}
              style={{
                border: "1px solid #000000",
                // Set the aspect ratio of the picture to prevent stretching
                maxWidth: `${600 * (width / height)}px`,
                maxHeight: "600px",
              }}
            ></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

export default FabricJS;
