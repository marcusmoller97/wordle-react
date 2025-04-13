import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import getFeedback from '../utilis/feedback.js';
import SubmitForm from './submitForm.js';

type InputWordGuessProps = {
  word: string;
  uniqueLetters: boolean;
};

export default function InputWordGuess({ word, uniqueLetters }: InputWordGuessProps) {
  // hantera längden på ordet gissningar som överskrider ordet ska ges ett fel.
  // det är bara a-z som får skrivas in alla andra tecken ska väcka ett fel.
  // TODO: Vid submit ska en ruta med dinga gissade ord ploppa upp med olika färger beroende på gissning.
  //
  /* const [feedback, setFeedback] = useState([]); */
  const [guessWord, setGuess] = useState('');
  const [guesses, setGuesses] = useState(0);
  const [finished, setFinished] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timer: number;
    if (isRunning === true) {
      timer = window.setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const controllAnswer = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const getGuessFeedback = getFeedback(guessWord, word);
    const isCorrect = getGuessFeedback.every((item: { letter: string; result: string }) => {
      return item.result === 'correct';
    });

    const numberGuesses = guesses + 1;

    if (isCorrect === true ) {
      setGuesses(numberGuesses);
      setFinished(true);
      setIsRunning(false);
    } else {
      setGuesses(numberGuesses);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const guess = e.target.value;
    console.log(guess)
    if (guess.length > word.length || /[^a-zA-Z]/.test(guess)) {
      const alert = document.querySelector('.alert') as HTMLElement;
      alert.style.display = 'flex';
      setTimeout(() => {
        alert.style.display = 'none';
      }, 800);
      return; // Avsluta funktionen och skriv inte in mer
    }

    setGuess(guess);
  };
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
          <Alert
            className="alert"
            sx={{
              display: 'none',
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
            Gissning måste vara {word.length} tecken lång
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
