import { Box } from '@mui/material';

type FeedbackItem = {
  letter: string;
  result: 'correct' | 'incorrect' | 'misplaced';
};

type rowProps = {
  guessLength: number;
  currentGuess: string;
  feedback: FeedbackItem[] | null;
};
export default function Row({ guessLength, currentGuess, feedback }: rowProps) {
  // to handle colors on the boxes.
  const getColor = (result: string) => {
    switch (result) {
      case 'correct':
        return 'green';
      case 'misplaced':
        return '#FFBF00';
      case 'incorrect':
        return 'grey';
      default:
        return 'primary.main';
    }
  };
  console.log(feedback)
  return (
    <>
      {feedback === null ? (
        <div style={{ display: 'flex' }}>
          {Array.from({ length: guessLength }).map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 50,
                height: 50,
                borderRadius: 1,
                boxShadow: 3,
                bgcolor: 'primary.main',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                fontSize: 24,
                fontWeight: 'bold',
                ml: 'auto',
                mr: 'auto',
                mb: 5,
              }}
            >
              {currentGuess[index]?.toUpperCase() || ''}
            </Box>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          {feedback.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: 50,
                height: 50,
                borderRadius: 1,
                boxShadow: 3,
                bgcolor: getColor(item.result),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                fontSize: 24,
                fontWeight: 'bold',
                ml: 'auto',
                mr: 'auto',
                mb: 5,
              }}
            >
              {currentGuess[index]?.toUpperCase() || ''}
            </Box>
          ))}
        </div>
      )}
    </>
  );
}
