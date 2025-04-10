import { useState } from 'react';
import { Box, Typography, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import WorldeConfigForm from './GameSetupForm';
import GuessWord from './guessWord';

export default function WordInput() {
  const [FormData, setFormData] = useState<FormData | null>(null);
  const [pageChanged, setPageChanged] = useState(false);

  type FormData = {
    charAmount: number;
    uniqueLetters: boolean;
    changePage: boolean;
  };

  const handelFormSubmit = (data: FormData) => {
    console.log('Formulärdata mottagen i WordInput:', data);
    setPageChanged(true);
    setFormData(data);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#007FFF',
        dark: '#0066CC',
      },
    },
  });

  return (
    <>
      {pageChanged !== true ? (
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              maxWidth: 800,
              minHeight: 800,
              borderRadius: 1,
              margin: '5rem auto 5rem auto',
              bgcolor: 'primary.main',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'monospace',
                textAlign: 'center',
                color: 'white',
                paddingTop: '2rem',
              }}
            >
              Välkommen till spelet!
            </Typography>
            <Typography
              sx={{
                fontFamily: 'monospace',
                textAlign: 'center',
                color: 'white',
                padding: '2rem',
              }}
              variant="body1"
              gutterBottom
            >
              I detta spel kan du som användare gissa på ett ord i inputfältet. Därefter får du feedback genom att visa
              bokstäver i grönt som är korrekta, gult (misplaced) eller rött (incorrect) När ordet har gissats rätt är
              spelet över.
            </Typography>
            <WorldeConfigForm onSubmit={handelFormSubmit} />
          </Box>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              maxWidth: 800,
              minHeight: 800,
              borderRadius: 1,
              margin: '5rem auto 5rem auto',
              bgcolor: 'primary.main',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'monospace',
                textAlign: 'center',
                color: 'white',
                paddingTop: '2rem',
              }}
            >
              Gissa på ditt ord:
            </Typography>
            <GuessWord
              wordObject={{
                changePage: FormData ? FormData.changePage : false,
                charAmount: FormData ? FormData.charAmount : 1,
                uniqueLetters: FormData ? FormData.uniqueLetters : false,
              }}
            />
          </Box>
        </ThemeProvider>
      )}
    </>
  );
}
