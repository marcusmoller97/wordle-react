import { Typography, TextField, Button, Box } from '@mui/material';

type SubmitFormProps = {
    wordLength: number,
    time: number,
    guesses: number,
    uniqueLetters: boolean
};

export default function SubmitForm({ wordLength, time, guesses, uniqueLetters }: SubmitFormProps) {
  return (
    <Box
      component="form"
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
    </Box>
  );
}
