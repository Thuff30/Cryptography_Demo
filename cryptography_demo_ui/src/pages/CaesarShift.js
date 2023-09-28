import React, { useState } from 'react';
import { InputField } from '../components/fields/InputField';
import Button from 'react-bootstrap/Button';

export function CaesarShift(props) {
    const DECODE = "decode";
    const ENCODE = "encode";
    const BREAK = "break";
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [shift, setShift] = useState(0);
    const [direction, setDirection] = useState("");

    const updateDirection = (e) => {
        let countDiv = document.getElementById("countDiv");
        document.getElementById("textFields").style.display = 'block';
        if (e.target.id.includes(ENCODE)) {
            setDirection(ENCODE);
            countDiv.hidden = false; 
        }
        else if (e.target.id.includes(DECODE)) {
            setDirection(DECODE);
            countDiv.hidden = false;
        }
        else {
            setDirection(BREAK);
            countDiv.hidden = true;
        }
        setOutput("");
    }

    const updateShift = (e) => {
        if (e.target.value) {
            setShift(parseInt(e.target.value));
        }
        else {
            setShift(0);
        }
    }

    const updateInput = (e) => {
        setInput(e.target.value.toUpperCase());
    }

    const processMessage = async () => {
        let options = {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'charset': 'utf-8'
                }   
        }
        let url = 'http://localhost:5555/'

        if (direction === ENCODE) {
            options.body = JSON.stringify({
                'message': input,
                'key': shift
            })
            url += 'encipherCaesar';
        }
        else if (direction === DECODE) {
            options.body = JSON.stringify({
                'message': input,
                'key': shift
            })
            url += 'decipherCaesar';
        }
        else {
            options.body = JSON.stringify({
                'message': input
            })
            url += 'breakCaesar';
        }

        await fetch(url, options)
            .then((resp) => resp.json())
            .then((result) => {
                setOutput(result);
            }
            );
    }

    const resetForm = () => {
        setInput("");
        setOutput("");
        setShift(0);
    }

    return (
        <div className="mainContainer" >
            <h1>Caesar Cipher</h1>
            <div className="radioContainer">
                <input
                    type="radio"
                    id={ENCODE}
                    name="caesarOption"
                    value={direction}
                    onChange={updateDirection}
                />
                <label htmlFor="encodeRadio">Encipher</label>
                <input
                    type="radio"
                    id={DECODE}
                    name="caesarOption"
                    value={direction}
                    onChange={updateDirection}
                />
                <label htmlFor="decodeRadio">Decipher</label>
                <input
                    type="radio"
                    id={BREAK}
                    name="caesarOption"
                    value={direction}
                    onChange={updateDirection}
                />
                <label htmlFor="breakRadio">Break Cipher</label>
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
                        change={updateInput } />
                </div>
                <br />
                <div id="countDiv">
                    <h4 htmlFor="cipherCount" id="cipherCountLabel">How many characters will the cipher shift?</h4>
                {/*</div>*/}
                {/*<div>*/}
                    <InputField
                        isTextArea="false"
                        thisType="number"
                        thisID="cipherCount"
                        thisValue={shift}
                        change={updateShift}
                    />
                </div>
                <br />
                <div>
                    <Button variant="outline-primary" onClick={processMessage}>Process</Button>
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
                        change={undefined}
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
}