import { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box, Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';

type SubmitFormProps = {
  wordLength: number;
  time: number;
  guesses: number;
  uniqueLetters: boolean;
};

export default function SubmitForm({ wordLength, time, guesses, uniqueLetters }: SubmitFormProps) {
  const [name, setName] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Hantera timeout på ett korrekt sätt
  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 2000);

      //remove timeout after finished
      return () => clearTimeout(timeout);
    }
  }, [showAlert]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const scoreData = {
      name,
      time,
      wordLength,
      guesses,
      uniqueLetters,
      createdAt: new Date(),
    };

    try {
      const response = await fetch('http://localhost:5080/api/scoreboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scoreData),
      });
      if (!response.ok) {
        throw new Error('Något gick fel');
      }

      setShowAlert(true);

    } catch (error) {
      console.error('Fel vid sparande av highscore: ', error);
    }
    console.log(scoreData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '80%',
        height: '800px',
        margin: '2rem auto 2rem auto',
        padding: 2,
        borderRadius: 10,
        boxShadow: 3,
        backgroundColor: '#FFF',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'monospace',
          textAlign: 'center',
          textDecoration: 'underline',
          color: 'black',
          paddingTop: '2rem',
        }}
        gutterBottom
      >
        Grattis du vann!
      </Typography>
      <Typography
        sx={{
          fontFamily: 'monospace',
          textAlign: 'center',
          color: 'black',
        }}
        variant="h5"
        gutterBottom
      >
        Fyll i uppgifterna nedanför:
      </Typography>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{
          display: 'block',
          backgroundColor: 'white',
          width: '40%',
          mt: 2,
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
        label="Namn"
        type="text"
        fullWidth
        variant="outlined"
      />
      <TextField
        value={time}
        sx={{
          display: 'block',
          backgroundColor: 'white',
          width: '40%',
          mt: 2,
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
        label="Tid"
        type=""
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        variant="outlined"
      />
      <TextField
        value={wordLength}
        sx={{
          display: 'block',
          backgroundColor: 'white',
          width: '40%',
          mt: 2,
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
        label="Ordets längd"
        InputProps={{
          readOnly: true,
        }}
        type=""
        fullWidth
        variant="outlined"
      />
      <TextField
        value={guesses}
        sx={{
          display: 'block',
          backgroundColor: 'white',
          width: '40%',
          mt: 2,
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
        label="Antal gissningar"
        type=""
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        variant="outlined"
      />
      <TextField
        value={uniqueLetters ? 'Ja' : 'Nej'}
        sx={{
          display: 'block',
          backgroundColor: 'white',
          width: '40%',
          mt: 2,
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
        label="Unika tecken"
        type=""
        InputProps={{
          readOnly: true,
        }}
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
        Spara
      </Button>
      <Alert
        sx={{
          display: showAlert ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          margin: '2rem auto',
          width: 'fit-content',
          padding: '1rem 2rem',
        }}
        icon={<CheckIcon fontSize="inherit" />}
        severity="success"
      >
        Datan sparas till databasen!
      </Alert>
    </Box>
  );
}
