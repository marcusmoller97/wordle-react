import React, { useState, useEffect } from 'react';

type Props = {
  wordObject: {
    changePage: boolean;
    charAmount: number;
    uniqueLetters: boolean;
  };
};

export default function guessWord({ wordObject }: Props) {
  const [word, setWord] = useState('');
  
  const newWord = async () => {
    const response = await fetch('http://localhost:5080/api');
    const data = await response.json();
    console.log(data.word);
    setWord(data.word);
  };
  return <p>{wordObject.charAmount.toString()}</p>;
}
