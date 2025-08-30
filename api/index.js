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
  console.log('Received POST /add-kill from:', req.headers.origin);
  console.log('Request body:', req.body);
  try {
    const { username } = req.body;
    if (!username || typeof username !== 'string') {
      console.log('Error: Missing or invalid username');
      return res.status(400).json({ error: 'Username is required and must be a string' });
    }
    const playerIndex = leaderboard.findIndex(p => p.username === username);
    if (playerIndex > -1) {
      leaderboard[playerIndex].score += 1;
    } else {
      leaderboard.push({ username, score: 1 });
    }
    leaderboard.sort((a, b) => b.score - a.score);
    res.json({ success: true });
  } catch (error) {
    console.error('Server error in /add-kill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/leaderboard', (req, res) => {
  console.log('Received GET /leaderboard from:', req.headers.origin);
  res.json(leaderboard);
});

module.exports = app;