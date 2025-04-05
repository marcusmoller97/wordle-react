import express from 'express';
import cors from 'cors';

import { chooseWord } from './src/wordle.js';

const PORT = 5080;
const app = express();
const corsOptions = {
    origin: ['http://localhost:5080'],
};

app.use(cors(corsOptions));
// error middleware

app.get('/wordlist/word', async (req, res) => {
    try {
        console.log(req, "jek");
        const response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json');
        const wordList = Object.keys(await response.json());

        const word = chooseWord(wordList, 5, true);
        res.send({ word });
    } catch (error) {
        console.error(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
