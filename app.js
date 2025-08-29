const express = require('express');
const app = express();
app.use(express.json());

// Fix CORS: Permite origens de qualquer lugar (inclui localhost e itch)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

let leaderboard = []; // Array simples, persiste só enquanto roda (use BD pra real)

app.post('/add-kill', (req, res) => {
  const { username } = req.body;
  const playerIndex = leaderboard.findIndex(p => p.username === username);
  if (playerIndex > -1) {
    leaderboard[playerIndex].score += 1;
  } else {
    leaderboard.push({ username, score: 1 });
  }
  leaderboard.sort((a, b) => b.score - a.score);
  res.json({ success: true });
});

app.get('/leaderboard', (req, res) => {
  res.json(leaderboard);
});

// Exporta pro Vercel serverless
module.exports = app;