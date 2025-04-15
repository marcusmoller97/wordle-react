import express from 'express';
import cors from 'cors';

import router from './routes/SendGameDataToDB.js';
import chooseWord from '../frontend/src/utilis/chooseWord.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// setup express
const app = express();
const PORT = process.env.PORT || 5080;

// connect to database
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Database is connected');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

// Json data middleware
app.use(express.json());

// enable cors
const corsOptions = {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

// paths
app
    .get('/home', (req, res) => {
        res.send('<h1>Hej</h1>');
    })
    .get('/wordlist/:wordLength/:uniqueLetters', async (req, res) => {
        const length = Number(req.params.wordLength);
        const uniqueLetters = (req.params.uniqueLetters === 'true' ? true : false);
        try {
            const response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json');
            const wordList = Object.keys(await response.json());
            const word = chooseWord(wordList, length, uniqueLetters);
            console.log(word);
            res.status(200).send({ word });
        } catch (error) {
            console.error('Fel vid hämtning av ordlistan: ', error);
            res.status(500).send({ error: 'Fel vid hämtning av ordlista' });
        }
    })
    .use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
