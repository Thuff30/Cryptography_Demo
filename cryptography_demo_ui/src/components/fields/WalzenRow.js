import React from 'react';
import '../../App.css';


export const WalzenRow = (props) => {
    return (
        <div className="steckerRow">
            <fieldset className="panel">
                <legend className="panelHeader">Rotor Selection</legend>
                <div style={{ display: 'inline-flex' }}>
                    <fieldset>
                        <legend className="inner-panelHeader" >Umkehrwalzen</legend>
                        <select
                            className="enig-drop_down"
                            id="umkDrop"
                            value={props.umkehr}
                            onChange={props.upUmkehr}
                        >
                            <option value="" defaultValue>-</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <legend className="inner-panelHeader">Walzen</legend>
                        <select
                            className="enig-drop_down"
                            id="walz3Drop"
                            value={props.walzen3}
                            onChange={props.upWalzen3}
                        >
                            <option value="" defaultValue>-</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                        <select
                            className="enig-drop_down"
                            id="walz2Drop"
                            value={props.walzen2}
                            onChange={props.upWalzen2}
                        >
                            <option value="" defaultValue>-</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                        <select
                            className="enig-drop_down"
                            id="walz1Drop"
                            value={props.walzen1}
                            onChange={props.upWalzen1}
                        >
                            <option value="" defaultValue>-</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </fieldset>
                </div>
            </fieldset>
        </div>
    );
}