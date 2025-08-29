const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: 'GET, POST, OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
}));

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

module.exports = app;
