const totalCards = 9;
const mainDeckBase = Array.from({ length: totalCards }, (_, i) => `card-${i + 1}.jpg`);
let mainDeck = [...mainDeckBase];
let discardDeck = [];

const cardImg = document.getElementById("card-image");
const mainCountSpan = document.getElementById("main-count");
const discardCountSpan = document.getElementById("discard-count");
const lastCardSpan = document.getElementById("last-card");
const discardThumbs = document.getElementById("discard-thumbnails");

// const showLabel = document.getElementById("show-label");
// const showCounts = document.getElementById("show-counts");
// const showDiscard = document.getElementById("show-discard");

const statusContainer = document.getElementById("status-container");
const discardListContainer = document.getElementById("discard-list-container");

function updateStatus() {
  mainCountSpan.innerText = mainDeck.length;
  discardCountSpan.innerText = discardDeck.length;
}

function updateDiscardThumbnails() {
  discardThumbs.innerHTML = '';
  discardDeck.forEach(card => {
    const item = document.createElement('div');
    item.className = 'thumbnail-item';

    const img = document.createElement('img');
    img.src = `images/${card}`;
    img.alt = card;

    const label = document.createElement('div');
    label.className = 'thumbnail-label';

    // Generate readable label, e.g., "Card 1"
    const name = card.replace('.jpg', '');
    label.textContent = name;

    item.appendChild(img);
    item.appendChild(label);
    discardThumbs.appendChild(item);
  });
}


function drawCard() {
  if (mainDeck.length === 0) {
    alert("Main deck is empty. Please shuffle.");
    return;
  }

  const index = Math.floor(Math.random() * mainDeck.length);
  const picked = mainDeck.splice(index, 1)[0];
  discardDeck.push(picked);

  cardImg.src = `images/${picked}`;
  lastCardSpan.innerText = picked.replace('.jpg', '');

  updateStatus();
  updateDiscardThumbnails();
}

function shuffle() {
  mainDeck = [...mainDeck, ...discardDeck];
  discardDeck = [];

  cardImg.src = "images/card-back.jpg";
  lastCardSpan.innerText = "None";

  updateStatus();
  updateDiscardThumbnails();
}

// function updateVisibility() {
//   lastCardSpan.parentElement.style.display = showLabel.checked ? 'block' : 'none';
//   statusContainer.style.display = showCounts.checked ? 'block' : 'none';
//   discardListContainer.style.display = showDiscard.checked ? 'block' : 'none';
// }

function randomizeMainDeck() {
  for (let i = mainDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mainDeck[i], mainDeck[j]] = [mainDeck[j], mainDeck[i]];
  }
}

// showLabel.addEventListener('change', updateVisibility);
// showCounts.addEventListener('change', updateVisibility);
// showDiscard.addEventListener('change', updateVisibility);

updateStatus();
updateDiscardThumbnails();
updateVisibility();
