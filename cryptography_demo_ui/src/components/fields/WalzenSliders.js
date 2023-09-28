import React from 'react';
import '../../App.css';

export const WalzenSliders = (props) => {
    return (
            <fieldset class="panel">
                <legend class="panelHeader">Walzen Starting Position</legend>
                <div class="walzenSliderPanel">

                <div class="sliderDiv">
                    <input type="range" min="0" max="25" value={props.walzen1Off} onChange={props.walzen1OffUp} class="walzenSlider" id="walzen1" list="notches" />
                </div>
                <p className="enig-drop_down" >{props.walzen1Off}</p>
                <div class="sliderDiv">
                    <input type="range" min="0" max="25" value={props.walzen2Off} onChange={props.walzen2OffUp} class="walzenSlider" id="walzen2" list="notches" />
                </div>
                <p className="enig-drop_down" >{props.walzen2Off}</p>
                <div class="sliderDiv">
                    <input type="range" min="0" max="25" value={props.walzen3Off} onChange={props.walzen3OffUp} class="walzenSlider" id="walzen3" list="notches" />
                </div>
                <p className="enig-drop_down" >{props.walzen3Off}</p>

                    <datalist id="notches">
                        <option value="0">0</option>
                        <option value="1" />
                        <option value="2" />
                        <option value="3" />
                        <option value="4" />
                        <option value="5" />
                        <option value="6" />
                        <option value="7" />
                        <option value="8" />
                        <option value="9" />
                        <option value="10" />
                        <option value="11" />
                        <option value="12" />
                        <option value="13" />
                        <option value="14" />
                        <option value="15" />
                        <option value="16" />
                        <option value="17" />
                        <option value="18" />
                        <option value="19" />
                        <option value="20" />
                        <option value="21" />
                        <option value="22" />
                        <option value="23" />
                        <option value="24" />
                        <option value="25" />
                    </datalist>
                </div>
            </fieldset>
    );
}