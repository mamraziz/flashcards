const express = require('express');
const app = express();
app.use(express.json());


const flashcards = [
    {
        term: 'bonjour',
        definition: 'hello'
    },
    {
        term: 'au revoir',
        definition: 'goodbye'
    },
    {
        term: 'merci',
        definition: 'thank you'
    },
    {
        term: 'sil vous plaît',
        definition: 'please'
    }
];

app.get('/flashcards', (req, res) => {
  res.send(flashcards);
  console.log('Flashcards sent to client');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
