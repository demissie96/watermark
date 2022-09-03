// Send uploaded image to img element in App.jsx
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
