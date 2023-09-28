import React from 'react';

export function InputField(props) {
    if (props.isTextArea === 'true') {
        return (
            <div>
                <textarea
                    id={props.thisID}
                    rows={props.thisRows}
                    cols={props.thisCols}
                    className="entry-field"
                    value={props.thisValue}
                    onChange={props.change}
                />
            </div>
        );
    } else {
        return (
            <div>
                <input
                    type={props.thisType}
                    id={props.thisID}
                    className="entry-field"
                    value={props.thisValue}
                    onChange={props.change}
                    min="0"
                    max="25"
                    step="1"
                />
            </div>
        );
    }
}

export default InputField;