// dedicated-worker.js

onmessage = function (event) {
  var imageData = event.data;

  // Convert image data to Blob
  var blob = dataURLToBlob(imageData);

  createImageBitmap(blob).then(function (bitmap) {
    var offscreen = new OffscreenCanvas(bitmap.width, bitmap.height);
    var offscreenCtx = offscreen.getContext("2d");
    offscreenCtx.drawImage(bitmap, 0, 0);

    var imageData = offscreenCtx.getImageData(
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
      var r = data[i];
      var g = data[i + 1];
      var b = data[i + 2];

      var sepiaR = r * 0.393 + g * 0.769 + b * 0.189;
      var sepiaG = r * 0.349 + g * 0.686 + b * 0.168;
      var sepiaB = r * 0.272 + g * 0.534 + b * 0.131;

      data[i] = sepiaR > 255 ? 255 : sepiaR;
      data[i + 1] = sepiaG > 255 ? 255 : sepiaG;
      data[i + 2] = sepiaB > 255 ? 255 : sepiaB;
    }

    offscreenCtx.putImageData(imageData, 0, 0);

    offscreen.convertToBlob({ type: "image/jpeg" }).then(function (blob) {
      var reader = new FileReader();
      reader.onloadend = function () {
        var processedImageData = reader.result;
        postMessage(processedImageData);
      };
      reader.readAsDataURL(blob);
    });
  });
};

function dataURLToBlob(dataURL) {
  var base64String = dataURL.split(",")[1];
  var byteString = atob(base64String);
  var arrayBuffer = new ArrayBuffer(byteString.length);
  var uint8Array = new Uint8Array(arrayBuffer);

  for (var i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  var blob = new Blob([arrayBuffer], { type: "image/jpeg" });
  return blob;
}
