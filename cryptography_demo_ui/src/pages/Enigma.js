import React, { useState } from 'react';
import { SteckerbrettRow } from '../components/SteckerbrettRow';
import { WalzenSliders } from '../components/fields/WalzenSliders'
import { InputField } from '../components/fields/InputField';
import { WalzenRow } from '../components/fields/WalzenRow';
import { SteckerbrettMatches } from '../components/fields/SteckerbrettMatches';
import { FindIndex, FindIndexesFromVal } from "../functions/sharedFunctions";
import '../App.css';

export const Enigma = () => {
    const DECODE = "decode";
    const ENCODE = "encode";
    const defaultRow1 = [
        {
            "key": "Q",
            "value": ""
        },
        {
            "key": "W",
            "value": ""
        },
        {
            "key": "E",
            "value": ""
        },
        {
            "key": "R",
            "value": ""
        },
        {
            "key": "T",
            "value": ""
        },
        {
            "key": "Z",
            "value": ""
        },
        {
            "key": "U",
            "value": ""
        },
        {
            "key": "I",
            "value": ""
        },
        {
            "key": "O",
            "value": ""
        }
    ];
    const defaultRow2 = [
        {
            "key": "A",
            "value": ""
        },
        {
            "key": "S",
            "value": ""
        },
        {
            "key": "D",
            "value": ""
        },
        {
            "key": "F",
            "value": ""
        },
        {
            "key": "G",
            "value": ""
        },
        {
            "key": "H",
            "value": ""
        },
        {
            "key": "J",
            "value": ""
        },
        {
            "key": "K",
            "value": ""
        }
    ]
    const defaultRow3 = [
        {
            "key": "P",
            "value": ""
        },
        {
            "key": "Y",
            "value": ""
        },
        {
            "key": "X",
            "value": ""
        },
        {
            "key": "C",
            "value": ""
        },
        {
            "key": "V",
            "value": ""
        },
        {
            "key": "B",
            "value": ""
        },
        {
            "key": "N",
            "value": ""
        },
        {
            "key": "M",
            "value": ""
        },
        {
            "key": "L",
            "value": ""
        }
    ];
    const [direction, setDirection] = useState(ENCODE);
    const [walzen1, setWalzen1] = useState('');
    const [walzen2, setWalzen2] = useState('');
    const [walzen3, setWalzen3] = useState('');
    const [walzen1Offset, setWalzen1Offset] = useState(0);
    const [walzen2Offset, setWalzen2Offset] = useState(0);
    const [walzen3Offset, setWalzen3Offset] = useState(0);
    const [umkehrwalze, setUmkehrwalze] = useState('')
    const [steckerRow1, setSteckerRow1] = useState(defaultRow1);
    const [steckerRow2, setSteckerRow2] = useState(defaultRow2);
    const [steckerRow3, setSteckerRow3] = useState(defaultRow3);
    const [steckerMatches, setSteckerMatches] = useState([]);
    const [disableDrops, setDisableDrops] = useState(false);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const radioChanged = (e) => {
        setDirection(e.target.id.includes(ENCODE) ? ENCODE : DECODE);
        setOutput("");
    }

    const updateUmkehrWalze = (e) => {
        setUmkehrwalze(e.target.value);
    }

    const updateWalzen3 = (e) => {
        setWalzen3(parseInt(e.target.value));
    }

    const updateWalzen3Off = (e) => {
        setWalzen3Offset(parseInt(e.target.value));
    }

    const updateWalzen2 = (e) => {
        setWalzen2(parseInt(e.target.value));
    }

    const updateWalzen2Off = (e) => {
        setWalzen2Offset(parseInt(e.target.value));
    }

    const updateWalen1 = (e) => {
        setWalzen1(parseInt(e.target.value));
    } 

    const updateWalzen1Off = (e) => {
        setWalzen1Offset(parseInt(e.target.value));
    }

    const updateSteckerMatches = () => {
        let matches = []

        for (let item of steckerRow1) {
            let indexCheck = !(FindIndex(item.key, matches) > -1) && !(FindIndex(item.value, matches) > -1);
            let indexesCheck = FindIndexesFromVal(item.key, matches).length === 0 && FindIndexesFromVal(item.value, matches).length === 0;

            if (item.value !== '' && indexCheck && indexesCheck ) {
                let newItem = {
                    "key": item.key,
                    "value": item.value,
                };
                matches.push(newItem);
            }
        }

        for (let item of steckerRow2) {
            let indexCheck = !(FindIndex(item.key, matches) > -1) && !(FindIndex(item.value, matches) > -1);
            let indexesCheck = FindIndexesFromVal(item.key, matches).length === 0 && FindIndexesFromVal(item.value, matches).length === 0;

            if (item.value !== '' && indexCheck && indexesCheck) {
                let newItem = {
                    "key": item.key,
                    "value": item.value,
                };
                matches.push(newItem);
            }
        }

        for (let item of steckerRow3) {
            let indexCheck = !(FindIndex(item.key, matches) > -1) && !(FindIndex(item.value, matches) > -1);
            let indexesCheck = FindIndexesFromVal(item.key, matches).length === 0 && FindIndexesFromVal(item.value, matches).length === 0;

            if (item.value !== '' && indexCheck && indexesCheck) {
                let newItem = {
                    "key": item.key,
                    "value": item.value,
                };
                matches.push(newItem);
            }
        }

        setSteckerMatches(matches);
        if (matches.length === 10) {
            setDisableDrops(true);
        } else {
            setDisableDrops(false);
        }
    }

    const updateSteckerRow1 = (e) => {
        //Update row 1
        //Remove all dropdowns in the row that are currently matched to the triggering dropdown
        let thisRow = Array.from(steckerRow1);
        let indexes = FindIndexesFromVal(e.target.id, thisRow);
        if (indexes.length > 0) {
            for (let index of indexes) {
                let item = thisRow[index];
                if (item.key !== e.target.value) {
                    item.value = '';
                    thisRow[index] = item;
                }
            }
        }
        let indexes2 = FindIndexesFromVal(e.target.value, thisRow);
        if (indexes2.length > 0) {
            for (let index of indexes2) {
                let item = thisRow[index];
                if (item.key !== e.target.id) {
                    item.value = '';
                    thisRow[index] = item;
                }
            }
        }

        //Set the value of the triggering dropdown
        let index = FindIndex(e.target.id, thisRow);
        let item1 = thisRow[index];
        item1.value = e.target.value;
        thisRow[index] = item1;

        //Check for and set the value of the matching dropdown if it is in row 1
        let index2 = FindIndex(e.target.value, thisRow);
        if (index2 > -1) {
            let thisItem = thisRow[index2];
            thisItem.value = e.target.id;
            thisRow[index2] = thisItem;
        }
        setSteckerRow1(thisRow);

        //Update row 2
        //Remove all dropdowns in the row that are currently matched to the triggering dropdown
        let row2 = Array.from(steckerRow2);
        let indexes3 = FindIndexesFromVal(e.target.id, row2);
        if (indexes3.length > 0) {
            for (let index of indexes3) {
                let item = row2[index];
                if (item.key !== e.target.value) {
                    item.value = '';
                    row2[index] = item;
                }
            }
        }
        let indexes4 = FindIndexesFromVal(e.target.value, row2);
        if (indexes4.length > 0) {
            for (let index of indexes4) {
                let item = row2[index];
                if (item.key !== e.target.id) {
                    item.value = '';
                    row2[index] = item;
                }
            }
        }

        //Check for and set the value of the matching dropdown if it is in row 2
        let index3 = FindIndex(e.target.value, row2);
        if (index3 > -1) {
            let item = row2[index3];
            item.value = e.target.id;
            row2[index3] = item;
        }

        setSteckerRow2(row2);

        //Update row 3
        //Remove all dropdowns in the row that are currently matched to the triggering dropdown
        let row3 = Array.from(steckerRow3);
        let indexes5 = FindIndexesFromVal(e.target.id, row3)
        if (indexes5.length > 0) {
            for (let index of indexes5) {
                let item = row3[index];
                item.value = '';
                row3[index] = item;
            }
        }
        let indexes6 = FindIndexesFromVal(e.target.value, row3);
        if (indexes6.length > 0) {
            for (let index of indexes6) {
                let item = row3[index];
                if (item.key !== e.target.id) {
                    item.value = '';
                    row3[index] = item;
                }
            }
        }

        //Check for and set the value of the matching dropdown if it is in row 3
        let index4 = FindIndex(e.target.value, row3);
        if (index4 > -1) {
            let item = row3[index4];
            item.value = e.target.id;
            row3[index4] = item;
        }
        setSteckerRow3(row3);

        updateSteckerMatches();
    }

    const updateSteckerRow2 = (e) => {
        //Update row 2
        //Remove all dropdowns in the row that are currently matched to the triggering dropdown
        let thisRow = Array.from(steckerRow2);
        let indexes = FindIndexesFromVal(e.target.id, thisRow);
        if (indexes.length > 0) {
            for (let index of indexes) {
                let item = thisRow[index];
                if (item.key !== e.target.value) {
                    item.value = '';
                    thisRow[index] = item;
                }
            }
        }
        let indexes2 = FindIndexesFromVal(e.target.value, thisRow);
        if (indexes2.length > 0) {
            for (let index of indexes2) {
                let item = thisRow[index];
                if (item.key !== e.target.id) {
                    item.value = '';
                    thisRow[index] = item;
                }
            }
        }

        //Set the value of the triggering dropdown
        let index = FindIndex(e.target.id, thisRow);
        let thisItem = thisRow[index];
        thisItem.value = e.target.value;
        thisRow[index] = thisItem;

        //Check for and set the value of the matching dropdown if it is in row 2
        let index2 = FindIndex(e.target.value, thisRow);
        if (index2 > -1) {
            let thisItem = thisRow[index2];
            thisItem.value = e.target.id;
            thisRow[index2] = thisItem;
        }
        setSteckerRow2(thisRow);

        //Update row 1
        //Remove all dropdowns in the row that are currently matched to the triggering dropdown
        let row1 = Array.from(steckerRow1);
        let indexes3 = FindIndexesFromVal(e.target.id, row1);
        if (indexes3.length > 0) {
            for (let index of indexes3) {
                let item = row1[index];
                if (item.key !== e.target.value) {
                    item.value = '';
                    row1[index] = item;
                }
            }
        }
        let indexes4 = FindIndexesFromVal(e.target.value, row1);
        if (indexes4.length > 0) {
            for (let index of indexes4) {
                let item = row1[index];
                if (item.key !== e.target.id) {
                    item.value = '';
                    row1[index] = item;
                }
            }
        }

        //Check for and set the value of the matching dropdown if it is in row 1
        let index3 = FindIndex(e.target.value, row1);
        if (index3 > -1) {
            let item = row1[index3];
            item.value = e.target.id;
            row1[index3] = item;
        }

        setSteckerRow1(row1);

        //Update row 3
        //Remove all dropdowns in the row that are currently matched to the triggering dropdown
        let row3 = Array.from(steckerRow3);
        let indexes5 = FindIndexesFromVal(e.target.id, row3)
        if (indexes5.length > 0) {
            for (let index of indexes5) {
                let item = row3[index];
                item.value = '';
                row3[index] = item;
            }
        }
        let indexes6 = FindIndexesFromVal(e.target.value, row3);
        if (indexes6.length > 0) {
            for (let index of indexes6) {
                let item = row3[index];
                if (item.key !== e.target.id) {
                    item.value = '';
                    row3[index] = item;
                }
            }
        }

        //Check for and set the value of the matching dropdown if it is in row 3
        let index4 = FindIndex(e.target.value, row3);
        if (index4 > -1) {
            let item = row3[index4];
            item.value = e.target.id;
            row3[index4] = item;
        }
        setSteckerRow3(row3);

        updateSteckerMatches();
    }

    const updateSteckerRow3 = (e) => {
        //Update row 3
        //Remove all dropdowns in the row that are currently matched to the triggering dropdown
        let thisRow = Array.from(steckerRow3);
        let indexes = FindIndexesFromVal(e.target.id, thisRow);
        if (indexes.length > 0) {
            for (let index of indexes) {
                let item = thisRow[index];
                if (item.key !== e.target.value) {
                    item.value = '';
                    thisRow[index] = item;
                }
            }
        }
        let indexes2 = FindIndexesFromVal(e.target.value, thisRow);
        if (indexes2.length > 0) {
            for (let index of indexes2) {
                let item = thisRow[index];
                if (item.key !== e.target.id) {
                    item.value = '';
                    thisRow[index] = item;
                }
            }
        }

        //Set the value of the triggering dropdown
        let index = FindIndex(e.target.id, thisRow);
        let thisItem = thisRow[index];
        thisItem.value = e.target.value;
        thisRow[index] = thisItem;

        //Check for and set the value of the matching dropdown if it is in row 3
        let index2 = FindIndex(e.target.value, thisRow);
        if (index2 > -1) {
            let item = thisRow[index2];
            item.value = e.target.id;
            thisRow[index2] = item;
        }
        setSteckerRow3(thisRow);

        //Update row 2
        //Remove all dropdowns in the row that are currently matched to the triggering dropdown
        let row2 = Array.from(steckerRow2);
        let indexes3 = FindIndexesFromVal(e.target.id, row2);
        if (indexes3.length > 0) {
            for (let index of indexes3) {
                let item = row2[index];
                if (item.key !== e.target.value) {
                    item.value = '';
                    row2[index] = item;
                }
            }
        }
        let indexes4 = FindIndexesFromVal(e.target.value, row2);
        if (indexes4.length > 0) {
            for (let index of indexes4) {
                let item = row2[index];
                if (item.key !== e.target.id) {
                    item.value = '';
                    row2[index] = item;
                }
            }
        }

        //Check for and set the value of the matching dropdown if it is in row 2
        let index3 = FindIndex(e.target.value, row2);
        if (index3) {
            let item = row2[index3];
            item.value = e.target.id;
            row2[index3] = item;
        }

        setSteckerRow2(row2);

        //Update row 1
        //Remove all dropdowns in the row that are currently matched to the triggering dropdown
        let row3 = Array.from(steckerRow1);
        let indexes5 = FindIndexesFromVal(e.target.id, row3)
        if (indexes5.length > 0) {
            for (let index of indexes5) {
                let item = row3[index];
                item.value = '';
                row3[index] = item;
            }
        }
        let indexes6 = FindIndexesFromVal(e.target.value, row3);
        if (indexes6.length > 0) {
            for (let index of indexes6) {
                let item = row3[index];
                if (item.key !== e.target.id) {
                    item.value = '';
                    row3[index] = item;
                }
            }
        }

        //Check for and set the value of the matching dropdown if it is in row 1
        let index5 = FindIndex(e.target.value, row3);
        if (index5 > -1) {
            let item = row3[index5];
            item.value = e.target.id;
            row3[index5] = item;
        }
        setSteckerRow1(row3);

        updateSteckerMatches();
    }

    const updateInput = (e) => {
        setInput(e.target.value.toUpperCase());
    }

    const updateOutput = async (e) => {
        let walzen = [walzen1, walzen2, walzen3];
        let offsets = [walzen1Offset, walzen2Offset, walzen3Offset];
        let steckers = [];
        for (let item of steckerRow1) {
            steckers.push(item);
        }
        for (let item of steckerRow2) {
            steckers.push(item);
        }
        for (let item of steckerRow3) {
            steckers.push(item);
        }
        let options = {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
            },
            body: JSON.stringify({
                'walzenlage': walzen,
                'grundstellung': offsets,
                'umkehrwalzeChoice': umkehrwalze,
                'steckerbrett': steckers,
                'message': input,
            })
        }
        let url = 'http://localhost:5555/';
        if (direction === ENCODE) {
            url += 'encipherEnigma';
        }
        else {
            url += 'decipherEnigma';
        }

        await fetch(url, options)
            .then((resp) => resp.json())
            .then((result) => {
                setOutput(result)
            });
    }

    const ResetForm = () => {
        setInput('');
        setOutput('');
        setSteckerMatches([]);
        setSteckerRow1(defaultRow1);
        setSteckerRow2(defaultRow2);
        setSteckerRow3(defaultRow3);
        setWalzen1('');
        setWalzen1Offset(0)
        setWalzen2('');
        setWalzen2Offset(0);
        setWalzen3('');
        setWalzen3Offset(0);
        setDisableDrops(false);
    }

    return (
        <div className="enigmaContainer" >
            <h1>Enigma Kriegsmarine M3</h1>
            <div className="radioContainer">
                <input
                    type="radio"
                    id={ENCODE}
                    name="caesarOption"
                    value={direction}
                    onChange={radioChanged}
                />
                <label htmlFor="EncodeChoice">Encode</label>
                <input
                    type="radio"
                    id={DECODE}
                    name="caesarOption"
                    value={direction}
                    onChange={radioChanged}
                />
                <label htmlFor="DecodeChoice">Decode</label>
            </div>
            <br />
            <table>
                <tr>
                    <td className="enigmaHalf">
                        <WalzenRow
                            umkehr={umkehrwalze}
                            upUmkehr={updateUmkehrWalze}
                            walzen3={walzen3}
                            upWalzen3={updateWalzen3}
                            walzen2={walzen2}
                            upWalzen2={updateWalzen2}
                            walzen1={walzen1}
                            upWalzen1={updateWalen1}
                        />
                    </td>
                    <td className="enigmaHalf">
                        <SteckerbrettMatches matches={steckerMatches} />
                    </td>
                </tr>
                <tr>
                    <td className="enigmaHalf">
                        <WalzenSliders
                            walzen1Off={walzen1Offset}
                            walzen1OffUp={updateWalzen1Off}
                            walzen2Off={walzen2Offset}
                            walzen2OffUp={updateWalzen2Off}
                            walzen3Off={walzen3Offset}
                            walzen3OffUp={updateWalzen3Off}
                        />
                    </td>
                    <td className="enigmaHalf">
                        <fieldset class="panel">
                            <legend class="panelHeader">Steckerbrett Connections</legend>
                            <div class="steckerPanel">
                                <SteckerbrettRow
                                    row='1'
                                    thisRow={steckerRow1}
                                    update={updateSteckerRow1}
                                    disableDrops={disableDrops}
                                />
                                <SteckerbrettRow
                                    row='2'
                                    thisRow={steckerRow2}
                                    update={updateSteckerRow2}
                                    disableDrops={disableDrops}
                                />
                                <SteckerbrettRow
                                    row='3'
                                    thisRow={steckerRow3}
                                    update={updateSteckerRow3}
                                    disableDrops={disableDrops}
                                />
                            </div>
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h3>Enter a message to encode</h3>
                        <InputField
                            isTextArea="true"
                            thisID="inboundMessage"
                            thisRows="7"
                            thisCols="100"
                            thisValue={input}
                            change={updateInput}
                        />
                    </td>
                    <td>
                        <h3>Result</h3>
                        <InputField
                            isTextArea="true"
                            thisID="outboundMessage"
                            thisRows="7"
                            thisCols="100"
                            thisValue={output}
                            change={undefined}
                            readOnly
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <button id="subButton" onClick={updateOutput}>Submit</button>
                    </td>
                    <td>
                        <button id="clearButton" onClick={ResetForm}>Reset</button>
                    </td>
                </tr>
            </table>
        </div>        
    );
}

export default Enigma;