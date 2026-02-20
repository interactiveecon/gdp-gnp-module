/* global ITEM_BANK */

const els = {
  nCards: document.getElementById("nCards"),
  newRoundBtn: document.getElementById("newRoundBtn"),
  checkBtn: document.getElementById("checkBtn"),
  computeBtn: document.getElementById("computeBtn"),
  resetBtn: document.getElementById("resetBtn"),
  status: document.getElementById("status"),

  pool: document.getElementById("cardPool"),
  bins: {
    GDP: document.getElementById("binGDP"),
    GNP: document.getElementById("binGNP"),
    BOTH: document.getElementById("binBOTH"),
    NEITHER: document.getElementById("binNEITHER")
  },

  scoreVal: document.getElementById("scoreVal"),
  gdpVal: document.getElementById("gdpVal"),
  gnpVal: document.getElementById("gnpVal"),
  nfiaVal: document.getElementById("nfiaVal"),
  explain: document.getElementById("explain")
};

let currentItems = []; // active round items
let draggedId = null;

function money(millions) {
  return `$${millions.toFixed(0)}m`;
}

function correctBin(item) {
  const gdp = !!item.gdpCounts;
  const gnp = !!item.gnpCounts;
  if (gdp && gnp) return "BOTH";
  if (gdp && !gnp) return "GDP";
  if (!gdp && gnp) return "GNP";
  return "NEITHER";
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickN(n) {
  return shuffle(ITEM_BANK).slice(0, n);
}

function clearFeedback() {
  document.querySelectorAll(".card").forEach(c => {
    c.classList.remove("good", "bad");
    const fb = c.querySelector(".feedback");
    if (fb) fb.textContent = "";
  });
  els.scoreVal.textContent = "—";
  els.gdpVal.textContent = "—";
  els.gnpVal.textContent = "—";
  els.nfiaVal.textContent = "—";
  els.explain.textContent = "";
}

function setStatus(msg) {
  els.status.textContent = msg;
}

function makeCard(item) {
  const div = document.createElement("div");
  div.className = "card";
  div.draggable = true;
  div.id = `card_${item.id}`;

  div.innerHTML = `
    <div class="top">
      <span class="tag">${item.type.toUpperCase()}</span>
      <span class="money">${money(item.value)}</span>
    </div>
    <div class="desc"><strong>${item.title}:</strong> ${item.desc}</div>
    <div class="feedback"></div>
  `;

  div.addEventListener("dragstart", (e) => {
    draggedId = item.id;
    e.dataTransfer.setData("text/plain", item.id);
    e.dataTransfer.effectAllowed = "move";
  });

  return div;
}

function setupDropzone(zone) {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("dragover");
    e.dataTransfer.dropEffect = "move";
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("dragover");
  });

  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("dragover");
    const id = e.dataTransfer.getData("text/plain") || draggedId;
    if (!id) return;

    const cardEl = document.getElementById(`card_${id}`);
    if (cardEl) zone.appendChild(cardEl);

    setStatus("Moved card.");
  });
}

function initDnD() {
  setupDropzone(els.pool);
  Object.values(els.bins).forEach(setupDropzone);
}

function renderRound(items) {
  currentItems = items;
  // clear zones
  [els.pool, ...Object.values(els.bins)].forEach(z => (z.innerHTML = ""));
  clearFeedback();

  items.forEach(item => {
    els.pool.appendChild(makeCard(item));
  });

  setStatus(`New round loaded: ${items.length} cards.`);
}

function resetBinsToPool() {
  clearFeedback();
  const allCards = document.querySelectorAll(".card");
  allCards.forEach(c => els.pool.appendChild(c));
  setStatus("Bins reset.");
}

function getPlacementMap() {
  // returns { itemId: "GDP"|"GNP"|"BOTH"|"NEITHER"|"POOL" }
  const map = {};
  currentItems.forEach(it => (map[it.id] = "POOL"));

  const zones = {
    POOL: els.pool,
    GDP: els.bins.GDP,
    GNP: els.bins.GNP,
    BOTH: els.bins.BOTH,
    NEITHER: els.bins.NEITHER
  };

  Object.entries(zones).forEach(([bin, zone]) => {
    zone.querySelectorAll(".card").forEach(card => {
      const id = card.id.replace("card_", "");
      map[id] = bin;
    });
  });

  return map;
}

function checkAnswers() {
  const place = getPlacementMap();
  let correct = 0;
  let totalPlaced = 0;

  currentItems.forEach(item => {
    const where = place[item.id];
    const cardEl = document.getElementById(`card_${item.id}`);
    const fb = cardEl.querySelector(".feedback");

    const target = correctBin(item);

    // only count as "attempted" if not in pool
    if (where !== "POOL") totalPlaced++;

    cardEl.classList.remove("good", "bad");

    if (where === target) {
      if (where !== "POOL") correct++;
      cardEl.classList.add("good");
      fb.textContent = "✓ Correct. " + item.explain;
    } else {
      cardEl.classList.add("bad");
      fb.textContent = `✗ Not quite. Correct bin: ${target}. ` + item.explain;
    }
  });

  els.scoreVal.textContent = `${correct} / ${currentItems.length}`;
  setStatus(`Checked answers. Correct: ${correct}/${currentItems.length}.`);
}

function computeTotals() {
  // totals are based on the true definitions, not student placement
  // GDP sums production items with gdpCounts
  // GNP sums:
  //   - production items with gnpCounts (positive)
  //   - factor items with gnpCounts using gnpSign (+/-)
  // NFIA is (factor income received from abroad) - (factor income paid to foreigners)
  // In this simplified module, NFIA is the sum of factor items' signed values.
  let gdp = 0;
  let gnp = 0;
  let nfia = 0;

  currentItems.forEach(item => {
    if (item.type === "production" && item.gdpCounts) {
      gdp += item.value;
    }

    if (item.gnpCounts) {
      if (item.type === "production") {
        gnp += item.value;
      } else if (item.type === "factor") {
        const sign = (typeof item.gnpSign === "number") ? item.gnpSign : +1;
        gnp += sign * item.value;
        nfia += sign * item.value;
      }
    }
  });

  els.gdpVal.textContent = money(gdp);
  els.gnpVal.textContent = money(gnp);
  els.nfiaVal.textContent = `${nfia >= 0 ? "+" : "−"}${money(Math.abs(nfia))}`;

  // Explanation text
  const relation = (gnp > gdp) ? "GNP is greater than GDP"
                  : (gnp < gdp) ? "GNP is less than GDP"
                  : "GNP equals GDP";

  const nfiaText = (nfia > 0)
    ? "NFIA is positive: U.S. residents earn more factor income abroad than foreigners earn here."
    : (nfia < 0)
      ? "NFIA is negative: foreigners earn more factor income from U.S. production than U.S. residents earn abroad."
      : "NFIA is zero: net factor income flows cancel out.";

  els.explain.textContent =
    `${relation} in this set because ${nfiaText} Identity check: GNP = GDP + NFIA.`;

  setStatus("Computed totals based on the economic definitions.");
}

function newRound() {
  const n = parseInt(els.nCards.value, 10);
  renderRound(pickN(n));
}

function init() {
  initDnD();
  newRound();

  els.newRoundBtn.addEventListener("click", newRound);
  els.checkBtn.addEventListener("click", checkAnswers);
  els.computeBtn.addEventListener("click", computeTotals);
  els.resetBtn.addEventListener("click", resetBinsToPool);
}

init();
