import { useState } from 'react';
import { Box, TextField, Button, FormControlLabel, Checkbox, Alert } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type Props = {
  onSubmit: (data: { charAmount: number; uniqueLetters: boolean; changePage: boolean }) => void;
};

export default function WorldeConfigForm({ onSubmit }: Props) {
  const [number, setNumber] = useState('');
  const [uniqueLetters, setUniqueLetters] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const parsedNumber = Number(number);
    if (Number.isInteger(parsedNumber) && parsedNumber >= 1) {
      setSubmitted(true);
      onSubmit({ charAmount: parsedNumber, uniqueLetters: uniqueLetters, changePage: submitted });
    } else {
      const alert = document.querySelector('.alert') as HTMLElement;
      alert.style.display = 'block';
      setTimeout(() => {
        alert.style.display = 'none';
      }, 3000);
    }
  };

  const isChecked = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUniqueLetters(ev.target.checked);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        mt: 3,
        p: 3,
        borderRadius: 2,
        backgroundColor: 'white',
        boxShadow: 3,
        maxWidth: '300px',
        margin: 'auto',
      }}
    >
      <TextField
        label="Antalet tecken på ordet"
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        inputProps={{
          min: 1, // Minimum värde
          max: 27, // Maximum värde
        }}
        fullWidth
        variant="outlined"
      />
      <FormControlLabel control={<Checkbox onChange={isChecked} color="primary" />} label="Unika tecken" />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Spela
      </Button>
      <Alert className="alert" sx={{ display: 'none' }} icon={<ErrorOutlineIcon fontSize="inherit" />} severity="error">
        Du måste välja hur många tecken du vill gissa på!
      </Alert>
    </Box>
  );
}
