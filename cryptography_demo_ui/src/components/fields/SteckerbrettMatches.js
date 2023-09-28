import React from 'react';
import '../../App.css';

export const SteckerbrettMatches = (props) => {
    let output = props.matches.length > 0 ? props.matches.map(({ key, value }) => `${key}<->${value}`).join(' | ') : 'None';
    return (
        <div>
            <h4>Current Connections</h4>
            <p>{output}</p>
        </div>
    )
}