var c;
var ctx;
var canvas;
var img;

export function InputToImage(event) {
  var image = document.getElementById("my_picture");
  image.src = URL.createObjectURL(event.target.files[0]);
}

export function ImageDimensions() {
  img = document.getElementById("my_picture");
  console.log("Image height: " + img.height);
  console.log("Image width: " + img.width);
  return [img.height, img.width];
}

export function ImageToCanvas() {
  img = document.getElementById("my_picture");
  // console.log("Image height: " + img.height);
  // console.log("Image width: " + img.width);

  //   document.getElementById("myCanvas").style.width = `${img.width}px`;
  //   document.getElementById("myCanvas").style.height = `${img.height}px`;

  c = document.getElementById("myCanvas");
  ctx = c.getContext("2d");
  canvas = ctx.canvas;

  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.min(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
  //                    0, 0, canvas.width, canvas.height); // destination rectangle
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );

  ctx.globalAlpha = 0.4;
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.rotate((15 * Math.PI) / 180);
  ctx.fillText("Hello World 5", canvas.width / 5, canvas.height / 5);
  ctx.fillText("Hello World 2", canvas.width / 2, canvas.height / 2);
  ctx.fillText("Hello World 1", canvas.width / 1.05, canvas.height / 2.5);
}

// canvas id: myCanvas
export function Download() {
  var link = document.createElement("a");
  link.download = "filename.png";
  link.href = document.getElementById("myCanvas").toDataURL();
  link.click();
}
