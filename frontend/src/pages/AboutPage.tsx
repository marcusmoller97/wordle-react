import { Typography, Box } from '@mui/material';

export default function AboutPage() {
  return (
    <Box
      sx={{
        width: '80%',
        height: '800px',
        margin: '2rem auto 2rem auto',
        padding: 2,
        borderRadius: 10,
        boxShadow: 3,
        backgroundColor: 'primary.main',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontFamily: 'monospace',
          textAlign: 'center',
          paddingTop: '2rem',
          color: '#fff',
        }}
      >
        Om detta projekt!
      </Typography>
      <Typography
        sx={{
          color: '#fff',
          textAlign: 'left',
          pt: 4,
          pl: 6,
        }}
        variant="body1"
        paragraph
      >
        Detta projekt är ett worlde inspirerat spel. Byggt med Vite, React, TypeScript, MongoDB, Material och express.
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'monospace',
          textAlign: 'center',
          paddingTop: '4rem',
          color: '#fff',
          textDecoration: 'underline',
        }}
      >
        Om mig
      </Typography>
      <Typography
        sx={{
          color: '#fff',
          textAlign: 'left',
          pt: 2,
          pl: 6,
        }}
        variant="body1"
        paragraph
      >
        Spelet är skapat av mig Marcus Möller som en skoluppgift för att lära mig mer om react, databaser och
        typescript.
      </Typography>
    </Box>
  );
}
