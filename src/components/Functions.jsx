// Send uploaded image to img element in App.jsx

export function InputToFirstImage(event, callback) {
  var image = document.getElementById("first_place");
  image.src = URL.createObjectURL(event.target.files[0]);
  image.onload = function () {
    console.log(`Image width/height: ${image.width}/${image.height}`);
    callback(image.width, image.height);
  };
}

export function ImageToResize(width, height, callback) {
  console.log(width, height);

  var img = document.getElementById("first_place");

  console.log("image upload to canvas was successful");
  const canvas = document.createElement("canvas");
  canvas.id = "resize-canvas";
  canvas.width = width / 2;
  canvas.height = height / 2;
  canvas.style.zIndex = 0;
  canvas.style.position = "relative";
  canvas.style.border = "1px solid";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  callback(canvas);
}

export function CanvasToSecondImage(canvas, callback) {
  console.log("canvas to second image successful");

  const image = new Image();
  image.id = "my_picture";
  image.src = canvas.toDataURL("image/jpeg");
  document.body.appendChild(image);
  image.onload = function() {
    console.log(`resized image: ${image.width}/${image.height}`);
    callback();
  }
  
}

// ######################x

export function InputToImage(event, callback) {
  var image = document.getElementById("my_picture");
  image.src = URL.createObjectURL(event.target.files[0]);
  image.onload = function () {
    callback();
  };
}

// Get the dimensions of the image and return
export function ImageDimensions() {
  var img = document.getElementById("my_picture");
  console.log("Image height: " + img.height);
  console.log("Image width: " + img.width);
  return [img.height, img.width];
}

// Download the edited picture in canvas
export function Download() {
  var link = document.createElement("a");
  link.download = "watermark.jpeg";
  link.href = document.getElementById("canvas").toDataURL("image/jpeg", 0.8);
  link.click();
}
