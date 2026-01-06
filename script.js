const choices = ["Rock", "Paper", "Scissors"];

const pixelArts = {
  Rock: [
    [0,1,1,1,0],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [0,1,1,1,0]
  ],
  Paper: [
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1]
  ],
  Scissors: [
    [1,0,1,0,0],
    [1,0,1,0,0],
    [1,0,1,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0]
  ]
};

let resultsMatrix = [];
let round = 0;
let wins1 = 0;
let wins2 = 0;
let maxWins = 0;

function startGame() {
  const rounds = parseInt(document.getElementById("rounds").value);

  if (rounds % 2 === 0) {
    alert("Only odd numbers are allowed");
    return;
  }

  maxWins = Math.ceil(rounds / 2);
  round = 0;
  wins1 = 0;
  wins2 = 0;
  resultsMatrix = [];

  document.getElementById("game").innerHTML = `
    <button onclick="playRound('Rock')">Rock</button>
    <button onclick="playRound('Paper')">Paper</button>
    <button onclick="playRound('Scissors')">Scissors</button>
  `;

  document.getElementById("results").innerHTML = "";
}

function playRound(player1Choice) {
  if (wins1 === maxWins || wins2 === maxWins) return;

  const player2Choice = choices[Math.floor(Math.random() * 3)];
  round++;

  const winner = determineWinner(player1Choice, player2Choice);

  if (winner === "player1") wins1++;
  if (winner === "player2") wins2++;

  resultsMatrix.push([round, player1Choice, player2Choice]);

  updateResults();

  if (wins1 === maxWins || wins2 === maxWins) {
    alert(wins1 > wins2 ? "Player Wins!" : "AI Wins!");
  }
}

function determineWinner(p1, p2) {
  if (p1 === p2) return "draw";
  if (
    (p1 === "Rock" && p2 === "Scissors") ||
    (p1 === "Paper" && p2 === "Rock") ||
    (p1 === "Scissors" && p2 === "Paper")
  ) return "player1";
  return "player2";
}

function renderPixelArt(choice) {
  const art = pixelArts[choice];
  let html = '<div class="pixel-art">';
  art.forEach(row => {
    row.forEach(pixel => {
      html += `<div class="pixel ${pixel ? "active" : ""}"></div>`;
    });
  });
  html += '</div>';
  return html;
}

function updateResults() {
  const last = resultsMatrix[resultsMatrix.length - 1];

  let html = `
    <h2>Last Round</h2>
    <div class="hand-container">
      <div>
        <h4>Player</h4>
        ${renderPixelArt(last[1])}
      </div>
      <div>
        <h4>AI</h4>
        ${renderPixelArt(last[2])}
      </div>
    </div>
    <h2>History</h2>
    <table>
      <tr><th>Round</th><th>Player</th><th>AI</th></tr>
  `;

  resultsMatrix.forEach(r => {
    html += `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`;
  });

  html += "</table>";
  document.getElementById("results").innerHTML = html;
}
