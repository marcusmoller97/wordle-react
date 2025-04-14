/**
 * @author Marcus Möller
 * 
 * Algoritm A:
 * 
 * 1. Skapa en array (`feedback`) för att lagra resultaten.
 * 2. Skapa ett objekt (`letterCount`) för att hålla reda på förekomsten av varje tecken i målordet.
 * 3. Räkna antalet förekomster av varje tecken i målordet och lagra dem i `letterCount`.
 * 4. Loopa genom varje tecken i gissningen:
 *    - Om det matchar motsvarande tecken i målordet:
 *      a. Markera det som "correct" i `feedback`.
 *      b. Minska dess antal i `letterCount`.
 *    - Annars, markera det som "incorrect" i `feedback`.
 * 5. Loopa genom `feedback` igen för att hitta felplacerade tecken:
 *    - Om ett tecken markerades som "incorrect" men fortfarande finns kvar i `letterCount`:
 *      a. Ändra dess resultat till "misplaced".
 *      b. Minska dess antal i `letterCount`.
 */

/**
 * 
 * @param {*} guess The word that the user guesses. 
 * @param {*} word The correct word.
 * @returns {*} feedback Array with the correct feedback from you're guess.
 */
export default function getFeedback (guess, word) {

    if (guess.length !== word.length) {
        console.log('Du har skrivit för lång gissning');
        return [];
    }

    // array to get response from
    const feedback = [];
    const letterCount = {};

    // count occurence of words and store them in a object.
    for (let ele of word) {
        ele = ele.toUpperCase();
        letterCount[ele] = (letterCount[ele] || 0) + 1;
    }

    // find correct chars or incorrect chars
    for (let i = 0; i < guess.length; i++) {
        const guessedLetter = guess[i].toUpperCase();
        const correctLetter = word[i].toUpperCase();

        if (guessedLetter === correctLetter) {
            feedback.push({ 'letter': guessedLetter, 'result': 'correct' });
            letterCount[guessedLetter]--;
        } else {
            feedback.push({ 'letter': guessedLetter, 'result': 'incorrect' });
        }
    }

    // find misplaced chars
    for (let i = 0; i < guess.length; i++) {
        const guessedLetter = guess[i].toUpperCase();

        if (feedback[i].result === 'incorrect' && letterCount[guessedLetter] > 0) {
            feedback[i].result = 'misplaced';
            letterCount[guessedLetter]--;
        }
    }

    return feedback;
}


/**
 * Algoritm B:
 * 1. Skapa en tom sträng för att kunna lagra det slutgiltigt genererade ordet.
 * 2. Skapa en ny array för att kunna lagra de ord som matchar de filtreringar som görs.
 * 3. Filtrera listan baserat på den längd som valts och om du vill ha unika tecken i ordet eller inte
 * 4. Kontrollera om listan är tom. Om listan är tom, skicka ett error meddelande med lämplig feltext.
 * 5. Om listan inte är tom, generera ett slumpmässigt valt element från din array. Tilldela elementet till din
 * tomma sträng.
 * 6. Returnera din sträng.
 */

/**
 * 
 * @param {*} wordList Array of words that can be used. 
 * @param {*} length A number of the total length the word can be.
 * @param {*} uniqueLetters A true or false value, depending if the user wants unique letters or not.
 * @returns {*} string The randomized choosen word, that fullfills the requirement from you're params. 
 */
function chooseWord (wordList, length, uniqueLetters) {

    let uniqueString = '';

    //Filter on length and uniqueLetters
    const filteredWords = wordList.filter(word => {
        return word.length === length && (uniqueLetters ? new Set(word).size === length : true);
    });

    // handle if no words match otherwise chosses a randomized word from the array.
    if (filteredWords.length === 0) {
        console.log('Inga matchande ord! Kontrollera dina parametrar.');
        return null;
    } else {
        uniqueString = filteredWords[Math.floor(Math.random() * filteredWords.length)];
    }

    return uniqueString;
}

export { getFeedback, chooseWord };
