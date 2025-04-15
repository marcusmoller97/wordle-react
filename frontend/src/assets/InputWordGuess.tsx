import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import getFeedback from '../utilis/feedback.js';
import SubmitForm from './SubmitForm';
import Row from './Row';

type InputWordGuessProps = {
  word: string;
  uniqueLetters: boolean;
};

type FeedbackItem = {
  letter: string;
  result: 'correct' | 'incorrect' | 'misplaced';
};

export default function InputWordGuess({ word, uniqueLetters }: InputWordGuessProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [guessWord, setGuess] = useState('');
  const [guesses, setGuesses] = useState(0);
  const [finished, setFinished] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[] | null>(null);

  // for timing the game
  useEffect(() => {
    let timer: number;
    if (isRunning === true) {
      timer = window.setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  // handle form when submitted
  const controllAnswer = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const getGuessFeedback = getFeedback(guessWord, word);
    setFeedbackList(getGuessFeedback);

    const isCorrect = getGuessFeedback.every((item: { letter: string; result: string }) => {
      return item.result === 'correct';
    });

    const numberGuesses = guesses + 1;

    if (isCorrect === true) {
      setGuesses(numberGuesses);
      setFinished(true);
      setIsRunning(false);
    } else {
      setGuesses(numberGuesses);
    }
  };

  // to handle input when typing
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const guess = e.target.value;

    if (guess.length > word.length || /[^a-zA-Z]/.test(guess)) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 800);
      return;
    }
    setGuess(guess);
  };

  //to get row component for guess.

  return (
    <>
      {finished !== true ? (
        <Box
          component="form"
          onSubmit={controllAnswer}
          sx={{
            width: '80%',
            height: '400px',
            margin: '2rem auto 2rem auto',
            padding: 2,
            borderRadius: 10,
            boxShadow: 3,
            backgroundColor: '#FFF',
          }}
        >
          <Row guessLength={word.length} currentGuess={guessWord} feedback={feedbackList} />
          <Alert
            className="alert"
            sx={{
              display: showAlert ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              margin: '2rem auto',
              width: 'fit-content',
              padding: '1rem 2rem',
            }}
            icon={<ErrorOutlineIcon fontSize="inherit" />}
            severity="error"
          >
            Gissning måste vara {word.length} tecken lång!
            <br />
            Inga tecken annat än a-z får användas!
          </Alert>
          <TextField
            value={guessWord}
            onChange={handleInput}
            sx={{
              display: 'block',
              backgroundColor: 'white',
              width: '40%',
              mt: 2,
              mb: 5,
              marginRight: 'auto',
              marginLeft: 'auto',
            }}
            label="Skriv din gissning"
            type="text"
            fullWidth
            variant="outlined"
          />
          <Button
            sx={{
              display: 'block',
              width: '40%',
              mt: 2,
              mb: 5,
              marginRight: 'auto',
              marginLeft: 'auto',
            }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Gissa
          </Button>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Tid: {time} sekunder
          </div>
        </Box>
      ) : (
        <SubmitForm wordLength={word.length} time={time} guesses={guesses} uniqueLetters={uniqueLetters} />
      )}
    </>
  );
}
