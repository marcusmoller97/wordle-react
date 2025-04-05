import React from 'react';
import { Typography } from '@mui/material';

export default function AboutPage() {

  return (
    <div>
      <Typography
        variant="h2"
        sx={{
          fontFamily: 'monospace',
          textAlign: 'center',
          paddingTop: '2rem',
        }}
      >
        Om detta projekt!
      </Typography>
      <p>This project is built with Vite, React, TypeScript, and React Router.</p>
    </div>
  );
}
