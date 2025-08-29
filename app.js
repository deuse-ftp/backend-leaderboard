const express = require('express');
const cors = require('cors'); // Novo: pra fix CORS

const app = express();
app.use(express.json());
app.use(cors()); // Novo: Libera CORS pra todas origens

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

app.listen(3000, () => console.log('Backend rodando em http://localhost:3000'));