// shared-worker.js

onconnect = function (event) {
    var port = event.ports[0];
    port.onmessage = function (event) {
      var imageData = event.data;
  
      createImageBitmap(dataURItoBlob(imageData)).then(function (img) {
        var offscreen = new OffscreenCanvas(img.width, img.height);
        var offscreenCtx = offscreen.getContext("2d");
        offscreenCtx.drawImage(img, 0, 0);
  
        var imageData = offscreenCtx.getImageData(0, 0, offscreen.width, offscreen.height);
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
            port.postMessage(processedImageData);
          };
          reader.readAsDataURL(blob);
        });
      });
    };
  };
  
  function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }