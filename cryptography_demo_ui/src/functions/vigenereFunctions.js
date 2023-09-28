import { ShiftQueue } from './sharedFunctions'

const reference = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export const Encode = (userInput, key) => {
    let tabulaRecta = GenerateCodeTable();
    let code = CodeString(userInput.length, key);
    let messageOut = ""

    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] !== ' ') {
            let tempArray = Array.from(tabulaRecta[reference.indexOf(userInput[i])]);
            messageOut += tempArray[reference.indexOf(code[i])];
        }
        else {
            messageOut += userInput[i];
        }
    }

    return messageOut;
}

export const Decode = (userInput, key) => {
    let tabulaRecta = GenerateCodeTable();
    let code = CodeString(userInput.length, key);
    let messageOut = "";

    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] !== ' ') {
            let tempArray = Array.from(tabulaRecta[reference.indexOf(code[i])]);
            messageOut += reference[tempArray.indexOf(userInput[i])];
        }
        else {
            messageOut += userInput[i];
        }
    }

    return messageOut;
}

//Generates the tabula recta
const GenerateCodeTable = () => {
    let tabulaRecta = [];
    let queue = Array.from(reference);

    tabulaRecta.push(Array.from(queue));
    for (let i = 0; i < 26; i++) {
        let letter = queue.shift();
        queue.push(letter);
        tabulaRecta.push(Array.from(queue));
    }

    return tabulaRecta;
}

//Generates a string of the key word repeated for the length of the message to be encoded
const CodeString = (inputLength, key) => {
    let keyArray = Array.from(key);
    let repititions = inputLength / keyArray.length;
    let remainder = inputLength % keyArray.length;
    let keyString = "";

    for (let i = 0; i < repititions; i++) {
        keyString += key;
    }

    for (let i = 0; i < remainder; i++) {
        keyString += keyArray[i];
    }

    return Array.from(keyString);
}