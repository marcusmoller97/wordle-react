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
        letterCount[ele] = (letterCount[ele.toUpperCase] || 0) + 1;
    }

    // find correct chars or incorrect chars
    for (const val in guess) {
        if (guess[val].toUpperCase() === word[val].toUpperCase()) {
            feedback.push({ 'letter': guess[val].toUpperCase(), 'result': 'correct' });
            letterCount[guess[val].toUpperCase()]--; //remove from char counter if value is correct.
        } else {
            feedback.push({ 'letter': guess[val].toUpperCase(), 'result': 'incorrect' });
        }
    }

    // find misplaced chars
    for (const i in guess) {
        if (feedback[i].letter === word[i].toUpperCase()) {
            continue;
        } else if (letterCount[guess[i].toUpperCase()] > 0) {
            feedback[i].result = 'misplaced';
            letterCount[guess[i]]--;
        }
    }

    return feedback;
}
