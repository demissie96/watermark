import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import "./FabricJS.css";

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

  return (
    <>
      <h1>Test FabricJS</h1>
      <div>
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
        <input
          type="range"
          id="opacity"
          defaultValue="-50"
          min="-100"
          max="-1"
          onChange={(event) => Slider(event)}
          onClick={(event) => Slider(event)}
        />
        <h3>Transparency: {transparency}%</h3>
        <h3>The opacity range is {opacity}</h3>
      </div>
      <br />
      <canvas
        id="canvas"
        width={height}
        height={width}
        style={{
          border: "1px solid #000000",
          // Set the aspect ratio of the picture to prevent stretching
          maxWidth: `${ 500 * (width / height) }px`, 
          maxHeight: "500px",
        }}
      ></canvas>
    </>
  );
}

export default FabricJS;
