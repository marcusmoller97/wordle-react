import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import chooseWord from '../frontend/src/utilis/chooseWord.js';

const PORT = process.env.PORT || 5080;
const app = express();
const corsOptions = {
    origin: ['http://localhost:5173'],
};

app.use(cors(corsOptions));

app.get('/wordlist/:wordLength/:uniqueLetters', async (req, res) => {
    const length = Number(req.params.wordLength);
    const uniqueLetters = (req.params.uniqueLetters === 'true' ? true : false);
    try {
        const response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json');
        const wordList = Object.keys(await response.json());
        const word = chooseWord(wordList, length, uniqueLetters);
        console.log(word)
        res.status(200).send({ word });
    } catch (error) {
        console.error('Fel vid hämtning av ordlistan: ', error);
        res.status(500).send({ error: 'Fel vid hämtning av ordlista' });
    }
});

/* // Static files
app.use(express.static(path.resolve(__dirname, '../frontend/dist')));
app.use(express.static(path.join(__dirname, 'public')));

// React fallback
app.get('*', (req, res) => {
    console.log('Sending frontend index.html');
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
}); */


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
