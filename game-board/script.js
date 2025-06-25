const urlParams = new URLSearchParams(window.location.search);
const side = urlParams.get("side") || "a";
const boardImage = document.getElementById("board-image");
const container = document.getElementById("circle-container");

// Load correct board image
boardImage.src = `assets/side-${side}.jpg`;

// Add tickable circles
(circlePositions[side] || []).forEach((pos) => {
  const circle = document.createElement("div");
  circle.classList.add("tick-circle");
  circle.style.top = pos.top;
  circle.style.left = pos.left;
  circle.addEventListener("click", () => circle.classList.toggle("ticked"));
  container.appendChild(circle);
});
