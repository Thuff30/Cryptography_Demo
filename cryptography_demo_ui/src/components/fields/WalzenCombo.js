import '../../App.css';
import React from 'react';

export const WalzenCombo = (props) => {
    
    if (props.isWalzen === "true") {
        return (
            <select class="enig-drop_down" id={props.thisId}>
                <option value="" defaultValue />
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
            </select>
        );
    }
    else {
        return (
            <select class="enig-drop_down" id={props.thisId}>
                <option value="" defaultValue />
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
        );
    }
        
    
}