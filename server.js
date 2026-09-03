const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const Database = require('better-sqlite3');
const db = new Database('cards.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    term TEXT,
    definition TEXT
  )
`);



app.post('/flashcards/new', (req, res) => {
    const term = req.body.term;
    const definition =  req.body.definition;
    db.prepare('INSERT INTO cards (term, definition) VALUES (?, ?)').run(term, definition);
    res.send("Recieved");
    console.log("New card");
})


app.get('/flashcards', (req, res) => {
  res.send(flashcards);
  console.log('Flashcards sent to client');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
