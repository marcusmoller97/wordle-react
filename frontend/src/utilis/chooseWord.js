/**
 * 
 * @param {*} wordList Array of words that can be used. 
 * @param {*} length A number of the total length the word can be.
 * @param {*} uniqueLetters A true or false value, depending if the user wants unique letters or not.
 * @returns {*} string The randomized choosen word, that fullfills the requirement from you're params. 
 */
export default function chooseWord (wordList, length, uniqueLetters) {

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
