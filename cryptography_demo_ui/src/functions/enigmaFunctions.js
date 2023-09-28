import { ShiftQueue, FindIndex } from "./sharedFunctions";

const reference = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export const StartEncoding = (userInput, enigmaInput) => {
    let enigmaSettings = {
        "walzenlage": enigmaInput.walzenlage,
        "walzen1": ShiftQueue(PopulateArray(enigmaInput.walzenlage[0]), enigmaInput.grundstellung[0]),
        "walzen2": ShiftQueue(PopulateArray(enigmaInput.walzenlage[1]), enigmaInput.grundstellung[1]),
        "walzen3": ShiftQueue(PopulateArray(enigmaInput.walzenlage[2]), enigmaInput.grundstellung[2]),
        "turnover": WalzenWenden(enigmaInput.walzenlage),
        "positions": enigmaInput.grundstellung,
        "umkehrwalze": AssignUmkehrwalze(enigmaInput.umkehrwalzeChoice),
        "steckerbrett": Steckerverbindugen(enigmaInput.steckerbrett)
    };

    let output = RemovePunc(userInput);
    return(Encode(enigmaSettings, output));
}

const Encode = (enigmaSettings, userInput) => {
    let output = '';
    let c = 0;

    //Replace all punctuation with set character combinations
    userInput = RemovePunc(userInput);

    for (let letter of userInput) {
        enigmaSettings = ShiftRotors(enigmaSettings);

        if (letter !== ' ') {
            //Pass letter through the steckerbrett
            let tempValue = enigmaSettings.steckerbrett.find((val) => val.key === letter).value;

            //Pass the letter through the walzen
            let tempValue2 = enigmaSettings.walzen1[tempValue].value;
            tempValue = FindIndex(tempValue2, enigmaSettings.walzen1);
            tempValue2 = enigmaSettings.walzen2[tempValue].value;
            tempValue = FindIndex(tempValue2, enigmaSettings.walzen2);
            tempValue2 = enigmaSettings.walzen3[tempValue].value;
            tempValue = FindIndex(tempValue2, enigmaSettings.walzen3);

            //Pass the letter through the umkehrwalze
            tempValue2 = enigmaSettings.umkehrwalze[tempValue];

            //Pass the letter bacj through the walzen
            tempValue = reference.indexOf(tempValue2);
            tempValue2 = enigmaSettings.walzen3[tempValue].key;
            let tempValue3 = enigmaSettings.walzen3.find((val) => val.value === tempValue2).key;
            tempValue = FindIndex(tempValue3, enigmaSettings.walzen3);
            tempValue2 = enigmaSettings.walzen2[tempValue].key;
            tempValue3 = enigmaSettings.walzen2.find((val) => val.value === tempValue2).key;
            tempValue = FindIndex(tempValue3, enigmaSettings.walzen2);
            tempValue2 = enigmaSettings.walzen1[tempValue].key;
            tempValue3 = enigmaSettings.walzen1.find((val) => val.value === tempValue2).key;
            tempValue = FindIndex(tempValue3, enigmaSettings.walzen1);

            //Pass letter back through the steckerbrett
            output += enigmaSettings.steckerbrett.find((val) => val.value === tempValue).key;

            //Add a space every 5 characters
            c++;
            if (c % 5 === 0) {
                output += ' ';
            }
        }
    }

    return output;
}

const PopulateArray = (rotorNum) => {
    let array = AssignArray(rotorNum);
    let walzen = [];

    for (let i = 0; i < array.length; i++) {
        let thisPair = { "key": reference[i], "value": array[i] };
        walzen.push(thisPair);
    }

    return walzen;
}

/* eslint-disable default-case */
const AssignArray = (rotorNum) => {
    let wiring = [];
    switch (rotorNum) {
        case 1:
            wiring = ['E', 'K', 'M', 'F', 'L', 'G', 'D', 'Q', 'V', 'Z', 'N', 'T', 'O', 'W', 'Y', 'H', 'X', 'U', 'S', 'P', 'A', 'I', 'B', 'R', 'C', 'J'];
            break;
        case 2:
            wiring = ['A', 'J', 'D', 'K', 'S', 'I', 'R', 'U', 'X', 'B', 'L', 'H', 'W', 'T', 'M', 'C', 'Q', 'G', 'Z', 'N', 'P', 'Y', 'F', 'V', 'O', 'E'];
            break;
        case 3:
            wiring = ['B', 'D', 'F', 'H', 'J', 'L', 'C', 'P', 'R', 'T', 'X', 'V', 'Z', 'N', 'Y', 'E', 'I', 'W', 'G', 'A', 'K', 'M', 'U', 'S', 'Q', 'O'];
            break;
        case 4:
            wiring = ['E', 'S', 'O', 'V', 'P', 'Z', 'J', 'A', 'Y', 'Q', 'U', 'I', 'R', 'H', 'X', 'L', 'N', 'F', 'T', 'G', 'K', 'D', 'C', 'M', 'W', 'B'];
            break;
        case 5:
            wiring = ['V', 'Z', 'B', 'R', 'G', 'I', 'T', 'Y', 'U', 'P', 'S', 'D', 'N', 'H', 'L', 'X', 'A', 'W', 'M', 'J', 'Q', 'O', 'F', 'E', 'C', 'K'];
            break;
        case 6:
            wiring = ['J', 'P', 'G', 'V', 'O', 'U', 'M', 'F', 'Y', 'Q', 'B', 'E', 'N', 'H', 'Z', 'R', 'D', 'K', 'A', 'S', 'X', 'L', 'I', 'C', 'T', 'W'];
            break;
        case 7:
            wiring = ['N', 'Z', 'J', 'H', 'G', 'R', 'C', 'X', 'M', 'Y', 'S', 'W', 'B', 'O', 'U', 'F', 'A', 'I', 'V', 'L', 'P', 'E', 'K', 'Q', 'D', 'T'];
            break;
        case 8:
            wiring = ['F', 'K', 'Q', 'H', 'T', 'L', 'X', 'O', 'C', 'B', 'J', 'S', 'P', 'D', 'Z', 'R', 'A', 'M', 'E', 'W', 'N', 'I', 'U', 'Y', 'G', 'V'];
            break;
    }

    return wiring;
}

const AssignUmkehrwalze = (choice) => {
    let umkehrwalze = [];

    switch (choice) {
        case 'B':
            umkehrwalze = [ 'Y', 'R', 'U', 'H', 'Q', 'S', 'L', 'D', 'P', 'X', 'N', 'G', 'O', 'K', 'M', 'I', 'E', 'B', 'F', 'Z', 'C', 'W', 'V', 'J', 'A', 'T' ];
            break;
        case 'C':
            umkehrwalze = [ 'F', 'V', 'P', 'J', 'I', 'A', 'O', 'Y', 'E', 'D', 'R', 'Z', 'X', 'W', 'G', 'C', 'T', 'K', 'U', 'Q', 'S', 'B', 'N', 'M', 'H', 'L' ];
            break;
    }

    return umkehrwalze;
}

const Steckerverbindugen = (steckerbrett) => {
    let stecker = [];
    for (let pair of steckerbrett) {
        if (pair.value !== '') {
            let firstPair = {
                "key": pair.key,
                "value": reference.indexOf(pair.value)
            };
            stecker.push(firstPair);

            let secondPair = {
                "key": pair.value,
                "value": reference.indexOf(pair.key)
            };
            stecker.push(secondPair);
        }
    }

    for (let letter of reference) {
        if (!stecker.find((val) => val.key === letter)) {
            stecker.push({
                "key": letter,
                "value": reference.indexOf(letter)
            });
        }
    }

    return stecker;
}

//Returns a list of key value objects containing the positions at which the Walzen trigger the next Walzen to turn one position
const WalzenWenden = (walzenlage) => {
    let turnover = [];
    for (let walzen of walzenlage) {
        let tempnum = 0;
        let tempnum2 = 0;

        //Determine correct turning point for the selected Walzen
        switch (walzen) {
            case 1:
                tempnum = 17;
                break;
            case 2:
                tempnum = 5;
                break;
            case 3:
                tempnum = 22;
                break;
            case 4:
                tempnum = 10;
                break;
            case 5:
                tempnum = 0;
                break;
            case 6:
            case 7:
            case 8:
                tempnum2 = 13;
                break;
        }

        //Assign turn values for the Walzen
        let thisTurn = { "key": walzen, "value": tempnum };
        turnover.push(thisTurn);
        if (tempnum2 !== 0) {
            let thisSecTurn = { "key": walzen, "value": tempnum2 };
            turnover.push(thisSecTurn);
        }
    }

    return turnover;
}

const RemovePunc = (userInput) => {
    userInput = userInput.replaceAll(".", "BX");
    userInput = userInput.replaceAll(",", "YB");
    userInput = userInput.replaceAll("?", "QD");
    userInput = userInput.replaceAll(":", "XX");
    userInput = userInput.replaceAll(";", "XJ");
    userInput = userInput.replaceAll("-", "VQ");
    userInput = userInput.replaceAll("/", "DX");
    userInput = userInput.replaceAll("\\", "CX");
    userInput = userInput.replaceAll("(", "KQ");
    userInput = userInput.replaceAll(")", "KX");
    userInput = userInput.replaceAll(" ", "");

    return userInput;
}

const AddPunc = (userInput) => {
    userInput = userInput.replaceAll(".", "BX");
    userInput = userInput.replaceAll(",", "YB");
    userInput = userInput.replaceAll("?", "QD");
    userInput = userInput.replaceAll(":", "XX");
    userInput = userInput.replaceAll(";", "XJ");
    userInput = userInput.replaceAll("-", "VQ");
    userInput = userInput.replaceAll("/", "DX");
    userInput = userInput.replaceAll("\\", "CX");
    userInput = userInput.replaceAll("(", "KQ");
    userInput = userInput.replaceAll(")", "KX");

    return userInput;
}

const ShiftRotors = (enigmaSettings) => {
    let tempNum = enigmaSettings.walzen1.shift();
    enigmaSettings.walzen1.push(tempNum);
    //Check if the rotor has reached the final notch
    if (enigmaSettings.positions[0] < 25) {
        enigmaSettings.positions[0]++;
    }
    else {
        enigmaSettings.positions[0] = 0;
    }

    let notch = enigmaSettings.turnover.find((val) => val.key === enigmaSettings.walzen1[0]);

    //Check if the first walzen is at the correct position to move the next rotor
    if (enigmaSettings.positions[0] === notch) {
        let tempNum2 = enigmaSettings.walzen2.shift();
        enigmaSettings.walzen2.push(tempNum2)

        let notch2 = enigmaSettings.turnover.find((val) => val.key === enigmaSettings.walzen2[0]);

        //Check if the second walzen is at the correct position to move the next rotor
        if (enigmaSettings.positions[1] < 25) {
            enigmaSettings.positions[1]++;
        }
        else {
            enigmaSettings.positions[1] = 0;
        }

        if (enigmaSettings.positions[1] === notch2) {
            let tempNum3 = enigmaSettings.walzen3.shift();
            enigmaSettings.walzen3.push(tempNum3)
        }
    }

    return enigmaSettings;
}