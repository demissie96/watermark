import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

function FabricJSTest({ height, width }) {
  // Define a state variable to store and access the fabric.Canvas object
  const [canvas, setCanvas] = useState("");

  // Opacity
  const [opacity, setOpacity] = useState(0.5);
  const [opacityPercent, setOpacityPercent] = useState(50);

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

  function AddImage() {
    var imgElement = document.getElementById("my_picture");
    var imgInstance = new fabric.Image(imgElement, {
      left: 0,
      top: 0,
      angle: 0,
      opacity: 1,
    });
    canvas.setWidth(imgInstance.width);
    canvas.setHeight(imgInstance.height);
    canvas.setBackgroundImage(imgInstance, canvas.renderAll.bind(canvas), {
      scaleX: canvas.width / imgInstance.width,
      scaleY: canvas.height / imgInstance.height,
    });
  }

  function Slider(event) {
    setOpacity(event.target.value / -100);
    let x = 100 - event.target.value * -1;
    setOpacityPercent(x);
    ChangeOpacity();
  }

  function DeleteObject() {
    canvas.remove(canvas.getActiveObject());
  }

  function ChangeOpacity() {
    let currentObject = canvas.getActiveObject();

    // Set your new property values
    currentObject.opacity = opacity;

    // Then you mark the object as "dirty" and render the canvas:
    currentObject.dirty = true;
    canvas.renderAll();
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
        <button type="button" onClick={() => canvas.discardActiveObject().renderAll()}>
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
        <h3>Transparency: {opacityPercent}%</h3>
        <h3>The opacity range is {opacity}</h3>
      </div>
      <br />
      <canvas
        id="canvas"
        width={height}
        height={width}
        style={{
          border: "1px solid #000000",
        }}
      ></canvas>
    </>
  );
}

export default FabricJSTest;
