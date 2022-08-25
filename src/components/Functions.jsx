var c;
var ctx;
var canvas;
var img;

// Send uploaded image to img element in App.jsx
export function InputToImage(event) {
  var image = document.getElementById("my_picture");
  image.src = URL.createObjectURL(event.target.files[0]);
}

// Get the dimensions of the image and return
export function ImageDimensions() {
  img = document.getElementById("my_picture");
  console.log("Image height: " + img.height);
  console.log("Image width: " + img.width);
  return [img.height, img.width];
}

// Draw image to canvas
export function ImageToCanvas() {
  img = document.getElementById("my_picture");
  c = document.getElementById("myCanvas");
  ctx = c.getContext("2d");
  canvas = ctx.canvas;

  ctx.drawImage(img, 0, 0);  
}

// Add text to canvas
export function AddWatermark() {
  ctx.globalAlpha = 0.4;
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.rotate((15 * Math.PI) / 180);
  ctx.fillText("Hello World 5", canvas.width / 5, canvas.height / 5);
  ctx.fillText("Hello World 2", canvas.width / 2, canvas.height / 2);
  ctx.fillText("Hello World 1", canvas.width / 1.05, canvas.height / 2.5);
}

// Download the edited picture in canvas
export function Download() {
  var link = document.createElement("a");
  link.download = "filename.png";
  link.href = document.getElementById("canvas").toDataURL();
  link.click();
}
