import mongoose from 'mongoose';

const highscoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    wordLength: {
        type: Number,
        required: true,
    },
    guesses: {
        type: Number,
        required: true,
    },
    uniqueLetters: {
        type: Boolean,
        required: String,
    },
    createdAt: { type: Date, default: Date.now },
});

const Highscore = mongoose.model('Highscore', highscoreSchema);

export default Highscore;