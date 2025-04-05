import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '100px',
        backgroundColor: 'primary.main',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        pb: '2',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'monospace',
          fontStyle: 'italic',
          fontSize: '1rem',
          color: 'white',
          paddingBottom: '0.5rem',
        }}
      >
        © 2025 Wordle by Marcus • All Rights Reserved
      </Typography>
    </Box>
  );
}
