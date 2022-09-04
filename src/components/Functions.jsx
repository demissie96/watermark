// Send uploaded image to img element
export function InputToFirstImage(event, callback) {
  var image = document.getElementById("first_place");
  image.src = URL.createObjectURL(event.target.files[0]);
  image.onload = function () {
    console.log(`Image width/height: ${image.width}/${image.height}`);
    callback(image.width, image.height);
  };
}

// Resize image in hidden canvas
export function ImageToResize(width, height, callback) {
  let resizedWidth = width;
  let resizedHeight = height;
  let aspectRatio = resizedWidth / resizedHeight;

  if (resizedWidth >= resizedHeight) {
    if (resizedWidth > 1280) {
      resizedWidth = 1280;
      resizedHeight = resizedWidth / aspectRatio;
    }
  } else {
    if (resizedHeight > 1280) {
      resizedHeight = 1280;
      resizedWidth = resizedHeight * aspectRatio;
    }
  }

  var img = document.getElementById("first_place");

  const canvas = document.createElement("canvas");
  canvas.id = "resize-canvas";
  canvas.width = resizedWidth;
  canvas.height = resizedHeight;
  canvas.style.zIndex = 0;
  canvas.style.position = "relative";
  canvas.style.border = "1px solid";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  callback(canvas);
}

// Send resized image in canvas to a second hidden img element
export function CanvasToSecondImage(canvas, callback) {
  const image = new Image();
  image.id = "my_picture";
  image.src = canvas.toDataURL("image/jpeg");
  document.body.appendChild(image);
  image.onload = function () {
    console.log(`Resized image: ${image.width}/${image.height}`);
    callback();
  };
}

// Get the dimensions of the image and return
export function ImageDimensions() {
  var img = document.getElementById("my_picture");
  return [img.height, img.width];
}

// Download the edited picture in canvas
export function Download() {
  var link = document.createElement("a");
  link.download = "watermark.jpeg";
  link.href = document.getElementById("canvas").toDataURL("image/jpeg", 0.8);
  link.click();
}
