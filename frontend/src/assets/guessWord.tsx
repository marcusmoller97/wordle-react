import { useEffect, useState } from 'react';
import axios from 'axios';
import InputWordGuess from './InputWordGuess';

type Props = {
  wordObject: {
    changePage: boolean;
    charAmount: number;
    uniqueLetters: boolean;
  };
};

export default function GuessWord({ wordObject }: Props) {
  const [word, setWord] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function newWord() {
      try {
        const response = await axios.get(`http://localhost:5080/wordlist?wordLength=5&uniqueLetters=true`);

        const word = response.data.word;

        if (!cancelled) {
          setWord(word);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Error fetching word:', error);
        }
      }
    }
    newWord();

    return () => {
      cancelled = true;
    };
  }, [wordObject]);

  return (
    <>
      {/* <p>{word}</p> */}
      <InputWordGuess word={word} uniqueLetters={wordObject.uniqueLetters} />
    </>
  );
}
