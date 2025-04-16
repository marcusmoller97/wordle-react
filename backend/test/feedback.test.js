import { describe, it } from '@jest/globals';
import getFeedback from '../src/wordle.js';


/**
 * Testtäckningsstrategi:
 * 
 * Testerna säkerställer att feedback-algoritmen korrekt identifierar de viktigaste matchningsfall.
 * Följande scenarier testas:
 * 
 * 1. **Alla bokstäver korrekta**: Varje tecken i gissningen matchar exakt motsvarande tecken i det korrekta ordet.
 * 2. **Alla bokstäver felaktiga**: Inga tecken i gissningen finns i det korrekta ordet.
 * 3. **Alla bokstäver felplacerade**: Alla tecken finns i det korrekta ordet men är på fel plats.
 * 4. **Blandning av felaktiga och korrekta ord**
 * 5. **Blandning av korrekta, felplacerade och felaktiga bokstäver**.
 * 6. **Dubbla bokstäver som överskrider antalet i det korrekta ordet**: Gissningen innehåller fler förekomster av en bokstav än vad som finns i det korrekta ordet.
 * 7. **Tom gissning**: Säkerställer att en tom inmatning hanteras korrekt.
 * 8. **Skiftlägeskänslighet (case sensitivity)**: Säkerställer att stora och små bokstäver behandlas likadant för alla ovanstående tester.
 */

describe('Tests for feedback algorithm', () => {
    it('should test when all chars correct', () => {
        const result = getFeedback('CYKLA', 'CYKLA');

        expect(result).toEqual(
            [
                { letter: 'C', result: 'correct' },
                { letter: 'Y', result: 'correct' },
                { letter: 'K', result: 'correct' },
                { letter: 'L', result: 'correct' },
                { letter: 'A', result: 'correct' },
            ]
        );
        expect(result).toHaveLength(5);

    });

    it('should return empty array', () => {
        const result = getFeedback('AABBBB', 'AABBB');
        expect(result).toHaveLength(0);

    });

    it('should test that all chars is incorrect', () => {
        const result = getFeedback('VÄNDA', 'SKOGS');

        expect(result).toEqual(
            [
                { letter: 'V', result: 'incorrect' },
                { letter: 'Ä', result: 'incorrect' },
                { letter: 'N', result: 'incorrect' },
                { letter: 'D', result: 'incorrect' },
                { letter: 'A', result: 'incorrect' }
            ]
        );

        expect(result).toHaveLength(5);
    });

    it('should test that all chars is misplaced', () => {
        const result = getFeedback('RAKET', 'TREKA');
        expect(result).toEqual(
            [
                { letter: 'R', result: 'misplaced' },
                { letter: 'A', result: 'misplaced' },
                { letter: 'K', result: 'misplaced' },
                { letter: 'E', result: 'misplaced' },
                { letter: 'T', result: 'misplaced' }
            ]
        );
        expect(result).toHaveLength(5);
    });

    it('should check for correct and incorrect letters', () => {
        const result = getFeedback('SKIFT', 'SKOTT');

        expect(result).toHaveLength(5);
        expect(result).toEqual(
            [
                { letter: 'S', result: 'correct' },
                { letter: 'K', result: 'correct' },
                { letter: 'I', result: 'incorrect' },
                { letter: 'F', result: 'incorrect' },
                { letter: 'T', result: 'correct' }
            ]
        );
    });

    it('shold check for correct, misplaced and incorrect letters', () => {
        const result = getFeedback('BOLOM', 'MORAL');

        expect(result).toHaveLength(5);
        expect(result).toEqual(
            [
                { letter: 'B', result: 'incorrect' },
                { letter: 'O', result: 'correct' },
                { letter: 'L', result: 'misplaced' },
                { letter: 'O', result: 'incorrect' },
                { letter: 'M', result: 'misplaced' }
            ]
        );
    });

    it('should handle empty guess', () => {
        const result = getFeedback('', 'CYKLA');
        expect(result).toHaveLength(0);
    });
});

describe('Tests for caseSensitivity', () => {
    it('should test when all chars correct', () => {
        const result = getFeedback('cykla', 'CYKLA');

        expect(result).toEqual(
            [
                { letter: 'C', result: 'correct' },
                { letter: 'Y', result: 'correct' },
                { letter: 'K', result: 'correct' },
                { letter: 'L', result: 'correct' },
                { letter: 'A', result: 'correct' },
            ]
        );
        expect(result).toHaveLength(5);

    });

    it('should test that all chars is incorrect', () => {
        const result = getFeedback('vända', 'SKOGS');

        expect(result).toEqual(
            [
                { letter: 'V', result: 'incorrect' },
                { letter: 'Ä', result: 'incorrect' },
                { letter: 'N', result: 'incorrect' },
                { letter: 'D', result: 'incorrect' },
                { letter: 'A', result: 'incorrect' }
            ]
        );

        expect(result).toHaveLength(5);
    });

    it('should test that all chars is misplaced', () => {
        const result = getFeedback('raket', 'TREKA');
        expect(result).toEqual(
            [
                { letter: 'R', result: 'misplaced' },
                { letter: 'A', result: 'misplaced' },
                { letter: 'K', result: 'misplaced' },
                { letter: 'E', result: 'misplaced' },
                { letter: 'T', result: 'misplaced' }
            ]
        );
        expect(result).toHaveLength(5);
    });

    it('shold check for correct, misplaced and incorrect letters', () => {
        const result = getFeedback('bolom', 'MORAL');

        expect(result).toHaveLength(5);
        expect(result).toEqual(
            [
                { letter: 'B', result: 'incorrect' },
                { letter: 'O', result: 'correct' },
                { letter: 'L', result: 'misplaced' },
                { letter: 'O', result: 'incorrect' },
                { letter: 'M', result: 'misplaced' }
            ]
        );
    });

    it('shold check for correct, misplaced and incorrect letters', () => {
        const result = getFeedback('uarar', 'urare');

        expect(result).toHaveLength(5);
        expect(result).toEqual(
            [
                { letter: 'U', result: 'correct' },
                { letter: 'A', result: 'misplaced' },
                { letter: 'R', result: 'misplaced' },
                { letter: 'A', result: 'incorrect' },
                { letter: 'R', result: 'misplaced' }
            ]
        );
    });
});
