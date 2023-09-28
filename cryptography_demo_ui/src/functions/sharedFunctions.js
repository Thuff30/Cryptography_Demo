import { DICTIONARY_URL } from '../constants/UrlConstants';
//import { findLetterFreq } from './frequencyFunctions.py';

/** Array of every English letter */
const reference = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
/** Array of every English word order by their frequency of use */
const lettersByFreq = ['E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R', 'D', 'L', 'C', 'U', 'M', 'W', 'F', 'G', 'Y', 'P', 'B', 'V', 'K', 'J', 'X', 'Q', 'Z'];
/** Regex of every English letter */
const refRegex = [/A/gi, /B/gi, /C/gi, /D/gi, /E/gi, /F/gi, /G/gi, /H/gi, /I/gi, /J/gi, /K/gi, /L/gi, /M/gi, /N/gi, /O/gi, /P/gi, /Q/gi, /R/gi, /S/gi, /T/gi, /U/gi, /V/gi, /W/gi, /X/gi, /Y/gi, /Z/gi];
/** List of the most common bigrams in English */
const bigrams = ['TH', 'HE', 'IN', 'ER', 'AN', 'RE', 'ON', 'AT', 'EN', 'ND', 'TI', 'ES', 'OR', 'TE', 'OF', 'ED', 'IS', 'IT', 'AL', 'AR', 'ST', 'TO', 'NT', 'NG', 'SE', 'HA', 'AS', 'OU'];

/**
 * Shifts an array the provided number of positions
 * @param {Array} queue
 * @param {Number} shiftNum
 * @returns {Array} queue
 */
export const ShiftQueue = (queue, shiftNum) => {
    for (let i = 0; i < shiftNum; i++) {
        let letter = queue.shift();
        queue.push(letter);
    }

    return queue;
}

export const FindIndex = (letter, arr) => {
    let len = arr.length;
        for (let i = 0; i < len; i++) {
            if (arr[i].key === letter) {
                return i;
            }
        }
}

export const FindIndexesFromVal = (letter, arr) => {
    let len = arr.length;
    let indexes = []
    for (let i = 0; i < len; i++) {
        if (arr[i].value === letter) {
            indexes.push(i);
        }
    }

    return indexes;
}

//Checks the given message for letter frequency
//Returns an array of objects with the most probable plain text matches of the top 10 most used letters
export const FindLetterFreq = (message) => {
    let letterFreq = []
    let probableMatches = [];
    for (let i = 0; i < refRegex.length; i++) {
        letterFreq.push({
            letter: reference[i],
            count: (message.match(refRegex[i]) || []).length
        })
    }
    letterFreq.sort(compareNumbers);
    for (let i = 0; i < 10; i++) {
        probableMatches.push({
            cipher: letterFreq[i].letter,
            plain: lettersByFreq[i]
        });
    }
    return probableMatches;
}

export const CheckAnswer = async (message) => {

    let wordsArray = message.split(' ');
    let success = true;
    let max = wordsArray.length > 4 ? 4 : wordsArray.length;
    for (let i = 0; i < max; i++) {
        await fetch(DICTIONARY_URL + wordsArray[i])
            .then(result => {
                if (result.status === 404) {
                    success = false;
                }
            });
    }
    return success;
}

const compareNumbers = (a, b) => {
    return parseInt(b.count) - parseInt(a.count);
}