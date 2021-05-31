// script.js

const img = new Image(); // used to load image from <input> and draw to canvas
var canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');
const file = document.getElementById("image-input");
const form = document.getElementById("generate-meme");
const clear = document.querySelector("[type='reset']");
const readText = document.querySelector("[type='button']");
const generate = document.querySelector("[type='submit']");
var textTop = document.getElementById("text-top");
var textBottom = document.getElementById("text-bottom");
var volume = document.getElementById("volume-group");



// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  // TODO
  context.clearRect(0,0,canvas.width,canvas.height);
  
  context.fillStyle = 'black';
  context.fillRect(0,0,400,400);
  
  clear.disabled = true;
  readText.disable = true;
  generate.disable = false;
  
  
  let dimensions = getDimmensions(400,400,img.width,img.height);
  context.drawImage(img,dimensions["startX"],dimensions["startY"], dimensions["width"],dimensions["height"]);
  
});



file.addEventListener("change", () => {
  var binaryData = [];
  binaryData.push(file.files[0]);
  img.src = window.URL.createObjectURL(new Blob(binaryData, {type:"application/zip"}));
  img.alt = file.files[0].name;
});


form.addEventListener("submit", (e)=>{
  context.fillStyle = "white";
  context.font = 'bold 48px serif';
  context.textAlign = "center";
  context.fillText(textTop.value,200,40);
  context.textAlign = "center"
  context.fillText(textBottom.value,200,380);
  generate.disabled = true;
  clear.disabled = false;
  readText.disabled = false;
  e.preventDefault();
});


clear.addEventListener("click", ()=>{
  context.clearRect(0,0,canvas.width, canvas.height);
  form.reset();
  generate.disabled = false;
  clear.disabled = true;
  readText.disabled = true;
});


function playText(text){
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
}


readText.addEventListener("click", ()=>{
  playText(textTop.value);
  playText(textBottom.value);
})

volume.addEventListener("input", ()=>{
  
});

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
