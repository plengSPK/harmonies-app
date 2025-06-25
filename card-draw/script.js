const totalCards = 9;
const mainDeckBase = Array.from(
  { length: totalCards },
  (_, i) => `card-${i + 1}.jpg`
);
let mainDeck = [...mainDeckBase];
let discardDeck = [];

const cardImg = document.getElementById("card-image");
const mainCountSpan = document.getElementById("main-count");
const discardCountSpan = document.getElementById("discard-count");
const lastCardSpan = document.getElementById("last-card");
const discardThumbs = document.getElementById("discard-thumbnails");

const statusContainer = document.getElementById("status-container");
const discardListContainer = document.getElementById("discard-list-container");
const STORAGE_KEY = "card-app-state";

function saveState() {
  const state = {
    mainDeck,
    discardDeck,
    lastCard: lastCardSpan.innerText,
    cardImage: cardImg.src,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const state = JSON.parse(saved);
    mainDeck = state.mainDeck || [];
    discardDeck = state.discardDeck || [];
    lastCardSpan.innerText = state.lastCard || "None";
    cardImg.src = state.cardImage || "images/card-back.jpg";
    updateStatus();
    updateDiscardThumbnails();
  }
}

function clearCache() {
  localStorage.removeItem(STORAGE_KEY);
  mainDeck = [...mainDeckBase];
  discardDeck = [];
  lastCardSpan.innerText = "None";
  cardImg.src = "images/card-back.jpg";
  updateStatus();
  updateDiscardThumbnails();
}

function updateStatus() {
  mainCountSpan.innerText = mainDeck.length;
  discardCountSpan.innerText = discardDeck.length;
}

function updateDiscardThumbnails() {
  discardThumbs.innerHTML = "";
  discardDeck.forEach((card) => {
    const item = document.createElement("div");
    item.className = "thumbnail-item";

    const img = document.createElement("img");
    img.src = `images/${card}`;
    img.alt = card;

    const label = document.createElement("div");
    label.className = "thumbnail-label";

    // Generate readable label, e.g., "Card 1"
    const name = card.replace(".jpg", "");
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
  lastCardSpan.innerText = picked.replace(".jpg", "");

  updateStatus();
  updateDiscardThumbnails();
  saveState();
}

function shuffle() {
  mainDeck = [...mainDeck, ...discardDeck];
  discardDeck = [];

  cardImg.src = "images/card-back.jpg";
  lastCardSpan.innerText = "None";

  updateStatus();
  updateDiscardThumbnails();
}

function randomizeMainDeck() {
  for (let i = mainDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mainDeck[i], mainDeck[j]] = [mainDeck[j], mainDeck[i]];
  }
}

loadState(); // ✅ Load saved decks
updateVisibility(); // ✅ Apply toggle visibility
