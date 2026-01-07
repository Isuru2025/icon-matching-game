const iconSet = [
  "fa-heart","fa-star","fa-bell","fa-car",
  "fa-cloud","fa-gift","fa-music","fa-camera",
  "fa-plane","fa-moon","fa-sun","fa-leaf"
];

const deck = document.getElementById("deck");
const movesEl = document.getElementById("moves");
const timeEl = document.getElementById("time");
const starsEl = document.getElementById("stars");
const levelLabel = document.getElementById("levelLabel");

const flipSound = new Audio("sounds/flip.mp3");
const matchSound = new Audio("sounds/match.mp3");
const winSound = new Audio("sounds/win.mp3");

let level = "easy";
let cards = [];
let openCards = [];
let moves = 0;
let timer = 0;
let interval;
let matched = 0;

document.getElementById("level").onchange = e => {
  level = e.target.value;
  levelLabel.textContent = level.toUpperCase();
  startGame();
  loadLeaderboard();
};

document.getElementById("restart").onclick = startGame;
document.getElementById("themeToggle").onclick =
  () => document.body.classList.toggle("dark");

document.getElementById("solve").onclick = aiSolve;

function startGame() {
  clearInterval(interval);
  timer = moves = matched = 0;
  openCards = [];

  timeEl.textContent = "Time: 0s";
  movesEl.textContent = "Moves: 0";
  starsEl.textContent = "⭐⭐⭐";

  const count = level === "easy" ? 4 : level === "medium" ? 6 : 8;
  cards = shuffle([...iconSet.slice(0, count), ...iconSet.slice(0, count)]);

  deck.style.gridTemplateColumns = `repeat(${count <= 4 ? 4 : 6},1fr)`;
  deck.innerHTML = "";

  cards.forEach(icon => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-face card-back"></div>
      <div class="card-face card-front">
        <i class="fa ${icon}"></i>
      </div>
    `;
    card.onclick = () => flip(card);
    deck.appendChild(card);
  });

  interval = setInterval(() => {
    timer++;
    timeEl.textContent = `Time: ${timer}s`;
  }, 1000);
}

function flip(card) {
  if (openCards.length === 2 || card.classList.contains("open")) return;

  flipSound.play();
  card.classList.add("open");
  openCards.push(card);

  if (openCards.length === 2) {
    moves++;
    movesEl.textContent = `Moves: ${moves}`;
    checkMatch();
  }
}

function checkMatch() {
  const [a, b] = openCards;

  if (a.innerHTML === b.innerHTML) {
    matchSound.play();
    a.classList.add("match");
    b.classList.add("match");
    matched += 2;
    openCards = [];

    if (matched === cards.length) win();
  } else {
    setTimeout(() => {
      a.classList.remove("open");
      b.classList.remove("open");
      openCards = [];
    }, 600);
  }
}

async function win() {
  clearInterval(interval);
  winSound.play();

  const name = prompt("Enter your name:");
  if (!name || !window.uid) return;

  await fb.addDoc(fb.collection(db, "leaderboard"), {
    uid: window.uid,     // anti-cheat
    name,
    time: timer,
    moves,
    level,
    created: fb.serverTimestamp()
  });

  document.getElementById("finalStats").textContent =
    `Level: ${level} | Time: ${timer}s | Moves: ${moves}`;

  document.getElementById("winModal").style.display = "flex";
  loadLeaderboard();
}

function closeModal() {
  document.getElementById("winModal").style.display = "none";
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

async function loadLeaderboard() {
  const list = document.getElementById("leaderboard");
  list.innerHTML = "";

  const q = fb.query(
    fb.collection(db, "leaderboard"),
    fb.where("level", "==", level),
    fb.orderBy("time"),
    fb.limit(10)
  );

  const snapshot = await fb.getDocs(q);

  snapshot.forEach(doc => {
    const d = doc.data();
    const li = document.createElement("li");
    li.textContent = `${d.name} — ${d.time}s — ${d.moves} moves`;
    list.appendChild(li);
  });
}

/* AI AUTO SOLVER */
function aiSolve() {
  const all = [...document.querySelectorAll(".card")];
  let i = 0;

  const loop = setInterval(() => {
    if (i >= all.length) return clearInterval(loop);
    if (!all[i].classList.contains("match")) flip(all[i]);
    i++;
  }, 200);
}

startGame();
loadLeaderboard();
