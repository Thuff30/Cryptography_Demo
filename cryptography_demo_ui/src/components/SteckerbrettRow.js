import React from 'react';
import { EnigmaCombo } from './fields/EnigmaCombo';
import '../App.css';

export const SteckerbrettRow = (props) => {
    /* eslint-disable default-case */
    switch (parseInt(props.row)) {
        case 1:
            return (
                <div className="steckerRow">
                    <EnigmaCombo thisId="Q" thisVal={props.thisRow[0].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="W" thisVal={props.thisRow[1].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="E" thisVal={props.thisRow[2].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="R" thisVal={props.thisRow[3].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="T" thisVal={props.thisRow[4].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="Z" thisVal={props.thisRow[5].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="U" thisVal={props.thisRow[6].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="I" thisVal={props.thisRow[7].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="O" thisVal={props.thisRow[8].value} thisChange={props.update} isDisabled={props.disableDrops} />
                </div>
            );
        case 2:
            return (
                <div className="steckerRow">
                    <EnigmaCombo thisId="A" thisVal={props.thisRow[0].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="S" thisVal={props.thisRow[1].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="D" thisVal={props.thisRow[2].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="F" thisVal={props.thisRow[3].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="G" thisVal={props.thisRow[4].value} thisChange={props.update} isDisabled={props.disableDrops} /> 
                    <EnigmaCombo thisId="H" thisVal={props.thisRow[5].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="J" thisVal={props.thisRow[6].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="K" thisVal={props.thisRow[7].value} thisChange={props.update} isDisabled={props.disableDrops} />
                </div>
            );
        case 3:
            return (
                <div className="steckerRow">
                    <EnigmaCombo thisId="P" thisVal={props.thisRow[0].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="Y" thisVal={props.thisRow[1].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="X" thisVal={props.thisRow[2].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="C" thisVal={props.thisRow[3].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="V" thisVal={props.thisRow[4].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="B" thisVal={props.thisRow[5].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="N" thisVal={props.thisRow[6].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="M" thisVal={props.thisRow[7].value} thisChange={props.update} isDisabled={props.disableDrops} />
                    <EnigmaCombo thisId="L" thisVal={props.thisRow[8].value} thisChange={props.update} isDisabled={props.disableDrops} />
                </div>
            );
    }
}

export default SteckerbrettRow;