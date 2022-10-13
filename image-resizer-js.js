const fileInput = document.querySelector(".resizer__file");
const widthInput = document.querySelector(".resizer__input--width");
const heightInput = document.querySelector(".resizer__input--height");
const aspectToggle = document.querySelector(".resizer__aspect");
const canvas = document.querySelector(".resizer__canvas");
const canvasCtx = canvas.getContext("2d");

let activeImage, originalWidthToHeightRatio;

fileInput.addEventListener("change", (e) => {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    openImage(reader.result);
  });

  reader.readAsDataURL(e.target.files[0]);
});

widthInput.addEventListener("change", () => {
  if (!activeImage) return;

  const heightValue = aspectToggle.checked
    ? widthInput.value / originalWidthToHeightRatio
    : heightInput.value;

  resize(widthInput.value, heightValue);
});

heightInput.addEventListener("change", () => {
  if (!activeImage) return;

  const widthValue = aspectToggle.checked
    ? heightInput.value * originalWidthToHeightRatio
    : widthInput.value;

  resize(widthValue, heightInput.value);
});

function openImage(imageSrc) {
  activeImage = new Image();

  activeImage.addEventListener("load", () => {
    originalWidthToHeightRatio = activeImage.width / activeImage.height;

    resize(activeImage.width, activeImage.height);
  });

  activeImage.src = imageSrc;
}

function resize(width, height) {
  canvas.width = Math.floor(width);
  canvas.height = Math.floor(height);
  widthInput.value = Math.floor(width);
  heightInput.value = Math.floor(height);

  canvasCtx.drawImage(activeImage, 0, 0, Math.floor(width), Math.floor(height));
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function candown (target, type) {
  // (B1) GET CANVAS
  let canvas = document.getElementById(target);
 
   // (B2) CREATE LINK
  let anchor = document.createElement("a");
  anchor.download = "resized-image." + type;
  anchor.href = canvas.toDataURL("image/" + type);
 
  // (B3) "FORCE DOWNLOAD"
  anchor.click();
  anchor.remove();
 
  // (B4) SAFER ALTERNATIVE - LET USER CLICK ON LINK
  // anchor.innerHTML = "Download";
  // document.body.appendChild(anchor);
}