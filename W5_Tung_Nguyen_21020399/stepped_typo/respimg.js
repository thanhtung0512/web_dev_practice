function createImages() {
    // Select all div elements with class "image-box"
    let imageBoxes = document.querySelectorAll("div.image-box");

    // Loop through each "image-box" element
    for (let i = 0; i < imageBoxes.length; i++) {
        // Create an img element
        let img = document.createElement("img");
        // Set its initial src attribute to an empty string
        img.src = "";
        // Insert the img element as the first child of the "image-box"
        imageBoxes[i].insertBefore(img, imageBoxes[i].firstChild);
    }
}

function selectBestImageSource(box, img, src) {
    // Check if the box has no width (hidden)
    if (box.clientWidth === 0) return;

    let bestSrc = "";
    let bestRatio = 1000.0;

    // Split the source string by comma to get image sources and their widths
    let sources = src.replace(/\s\s[\s]*/g, " ").trim().split(",");

    // Iterate through the sources
    for (let i = 0; i < sources.length; i++) {
        let source = sources[i].trim().split(" ");
        let ratio = 100.0;

        if (source.length >= 2) {
            ratio = Math.abs(parseInt(source[1]) - box.clientWidth) / box.clientWidth;
        }

        if (ratio < bestRatio) {
            bestRatio = ratio;
            bestSrc = source[0];
        }
    }

    // Check if the best source is not empty and different from the current image source
    if (bestSrc !== "" && img.src.indexOf(bestSrc) < 0) {
        // Set the img src to the best source
        img.src = bestSrc;
    }
}

function loadImages() {
    // Select all "image-box" elements, their child images, and hidden inputs
    let boxes = document.querySelectorAll("div.image-box");
    let images = document.querySelectorAll("div.image-box img");
    let sources = document.querySelectorAll("div.image-box input[type=hidden]");

    // Iterate through each "image-box" and load the best image source
    for (let i = 0; i < boxes.length; i++) {
        selectBestImageSource(boxes[i], images[i], sources[i].value);
    }
}

// Attach the loadImages function to the window's resize event
window.onresize = function() { loadImages(); };

// Call the createImages and loadImages functions
createImages();
loadImages();
