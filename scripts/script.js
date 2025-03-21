window.onload = function () {
  // Selecting options from the toolbar
  const colorPalette = document.getElementById("color");
  const sizes = document.querySelector(".size");
  const lineSizes = document.querySelector("#line-sizes");
  const lineSizeItems = document.querySelectorAll(".item");
  const paint = document.querySelector(".paint");
  const addText = document.querySelector(".text");
  const eraser = document.querySelector(".eraser");
  const clearButton = document.querySelector("button.clear");
  const fontSelector = document.getElementById("font-family");

  // Selecting Canvas
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  console.log(canvas.getBoundingClientRect());

  let isDrawing = false;

  // Fonts
  const fonts = [
    "Monoton",
    "Mountains of Christmas",
    "Orbitron",
    "Pinyon Script",
    "Press Start 2P",
    "Tourney",
    "UnifrakturMaguntia",
  ];

  fonts.forEach((font) => {
    const fontFace = new FontFace(
      font,
      `url(https://fonts.gstatic.com/s/${font.toLowerCase()}/v20/pxiGyp8kv8JHgFVrFJA.woff2)`
    );
    fontFace.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
    });
  });
  // Drawing variables
  let mode = "pencil";
  let fillColor = "#000000";
  let lineSize = "1";
  let fontFamily = "serif";

  function getMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function draw(e) {
    if (!isDrawing && mode !== "text") {
      return;
    }
    const { x, y } = getMousePosition(e);

    if (mode === "pencil") {
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.strokeStyle = fillColor;
      ctx.lineWidth = lineSize;
      ctx.lineCap = "round";
    }

    if (mode === "erase") {
      ctx.clearRect(x - lineSize, y - lineSize, lineSize, lineSize);
    }

    if (mode === "text") {
      console.log("The canvas is clicked");
      console.log(x, y);

      let caretX = x;

      /* Canvas does not take the keyboard events */
      document.addEventListener("keydown", (e) => {
        if (e.key.length === 1) {
          console.log(e.key);
          ctx.font = `48px ${fontFamily}`;
          ctx.fillText(e.key, caretX, y);
          caretX += ctx.measureText(e.key).width;
        }
      });
    }
  }

  canvas.addEventListener("mousedown", (e) => {
    if (mode !== "text") {
      isDrawing = true;
      const { x, y } = getMousePosition(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  });
  canvas.addEventListener("mouseup", (e) => {
    if (mode !== "text") {
      isDrawing = false;
      ctx.beginPath();
    }
  });
  canvas.addEventListener("mousemove", (e) => {
    if (mode !== "text") draw(e);
  });

  canvas.addEventListener("click", (e) => {
    if (mode === "text") {
      draw(e);
    }
  });

  // Using tools
  paint.addEventListener("click", (e) => {
    mode = "pencil";
  });

  colorPalette.addEventListener("change", (e) => {
    fillColor = e.target.value;
  });

  sizes.addEventListener("click", function () {
    lineSizes.classList.toggle("show");
  });

  lineSizeItems.forEach((item) => {
    item.addEventListener("click", function () {
      // console.log(this.dataset.size);
      lineSize = this.dataset.size;
    });
  });

  // Erasing the contents from the canvas
  eraser.addEventListener("click", function () {
    mode = "erase";
  });

  // Clear the canvas
  clearButton.addEventListener("click", function () {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.closePath();
  });

  // Add the text to the canvas
  addText.addEventListener("click", (e) => {
    mode = "text";
    // console.log("Text is selected");
    console.log(mode);
  });

  // Change the font family
  fontSelector.addEventListener("click", (e) => {
    fontFamily = e.target.value;
  });
};
