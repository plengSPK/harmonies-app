const urlParams = new URLSearchParams(window.location.search);
const side = urlParams.get("side") || "a";
const boardImage = document.getElementById("board-image");
const container = document.getElementById("circle-container");

// Load correct board image
boardImage.src = `assets/side-${side}.jpg`;

// Load saved state
const savedState = JSON.parse(localStorage.getItem(`ticks_${side}`) || "[]");

(circlePositions[side] || []).forEach((pos, index) => {
  const circle = document.createElement("div");
  circle.classList.add("tick-circle");
  circle.style.top = pos.top;
  circle.style.left = pos.left;

  // Restore ticked state
  if (savedState.includes(index)) {
    circle.classList.add("ticked");
  }

  circle.addEventListener("click", () => {
    circle.classList.toggle("ticked");

    // Save current ticked indexes
    const allCircles = container.querySelectorAll(".tick-circle");
    const tickedIndexes = [];
    allCircles.forEach((el, i) => {
      if (el.classList.contains("ticked")) {
        tickedIndexes.push(i);
      }
    });

    localStorage.setItem(`ticks_${side}`, JSON.stringify(tickedIndexes));
  });

  container.appendChild(circle);
});
