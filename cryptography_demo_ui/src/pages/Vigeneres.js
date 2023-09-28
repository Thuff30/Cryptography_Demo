import React, { useState } from 'react';
import { InputField } from '../components/fields/InputField';
import { Encode, Decode } from '../functions/vigenereFunctions';
import Button from 'react-bootstrap/Button';

export function Vigeneres(props) {
    const DECODE = "decode";
    const ENCODE = "encode";
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [key, setKey] = useState("");
    const [direction, setDirection] = useState("");

    const radioChanged = (e) => {
        document.getElementById("textFields").style.display = 'block';
        setDirection(e.target.id.includes(ENCODE) ? ENCODE : DECODE);
        setOutput("");
    }

    const process = async () => {
        let options = {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
            },
            body: JSON.stringify({
                'message': input,
                'key': key
            })
        }
        let url = 'http://localhost:5555/'

        if (direction === ENCODE) {
            url += 'encipherVigenere';
        }
        else {
            url += 'decipherVigenere';
        }

        await fetch(url, options)
            .then((resp) => resp.json())
            .then((result) => {
                setOutput(result)
            });
    }

    const updateInput = (e) => {
        setInput(e.target.value.toUpperCase());
    }

    const updateKey = (e) => {
        setKey(e.target.value.toUpperCase());
    }

    const resetForm = () => {
        setInput("");
        setOutput("");
        setKey("");
    }

    return (
        <div className="mainContainer" style={{ backgroundColor: 'slategray' }} >
            <h1>Vigenere Cipher</h1>
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
            <div id="textFields" hidden >
                <div>
                    <h3 htmlFor="inboundMessage" id="inboundLabel" >Enter a message to encode</h3>
                </div>
                <div>
                    <InputField
                        isTextArea="true"
                        thisID="inboundMessage"
                        thisRows="7"
                        thisCols="100"
                        thisValue={input}
                        change={updateInput}
                    />
                </div>
                <br />
                <div>
                    <h4 htmlFor="cipherKey" id="cipherKeyLabel">Key Phrase</h4>
                </div>
                <div>
                    <InputField
                        isTextArea="true"
                        thisID="messageKey"
                        thisRows="1"
                        thisCols="50"
                        thisValue={key}
                        change={updateKey}
                    />
                </div>
                <br />
                <div>
                    <Button variant="outline-primary" onClick={process}>Process</Button>
                    <Button variant="outline-primary" onClick={resetForm}>Clear</Button>
                </div>
                <br />
                <div>
                    <h3 htmlFor="outboundMessage" id="outboundLabel" >Result</h3>
                </div>
                <div>
                    <InputField
                        isTextArea="true"
                        thisID="outboundMessage"
                        thisRows="7"
                        thisCols="100"
                        thisValue={output}
                        readOnly />
                </div>
            </div>
        </div>
    );
}