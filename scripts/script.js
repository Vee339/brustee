window.onload = function () {
  // Selecting options from the toolbar
  const colorPalette = document.getElementById("color");
  const sizes = document.querySelector(".size");
  const lineSizes = document.querySelector("#line-sizes");
  const lineSizeItems = document.querySelectorAll(".item");
  const eraser = document.querySelector(".eraser");
  const clearButton = document.querySelector("button.clear");

  // Selecting Canvas
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  console.log(canvas.getBoundingClientRect());

  let isDrawing = false;

  // Drawing variables
  let mode = "pencil";
  let fillColor = "#000000";
  let lineSize = "1";

  function getMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function draw(e) {
    if (!isDrawing) {
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
  }
  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    const { x, y } = getMousePosition(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  });
  canvas.addEventListener("mouseup", (e) => {
    isDrawing = false;
    ctx.beginPath();
  });
  canvas.addEventListener("mousemove", draw);

  // Using tools
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

  eraser.addEventListener("click", function () {
    mode = "erase";
  });
  clearButton.addEventListener("click", function () {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.closePath();
  });
};
