import express from 'express';
import Highscore from '../modals/highScore.js';

const router = express.Router();

router.post('/highscore/send', async (req, res) => {
    try {
        const { name, time, wordLength, guesses, uniqueLetters, createdAt } = req.body;

        const newScore = new Highscore({
            name,
            time,
            wordLength,
            guesses,
            uniqueLetters,
            createdAt
        });

        await newScore.save();
        res.status(201).json({ message: 'Highscore sparad!' });
    } catch (error) {
        console.error('Fel vid sparande av highscore:', error);
        res.status(500).json({ message: 'Något gick fel' });
    }
});

export default router;
