import React  from "react";
import "./style.scss";
import useTone from "../../hooks/useTone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { padLeadingZeros, breakUpBarsBeatsSixteens } from "../../helpers/Util";

function Transportbar() {

    const { togglePlay, isPlaying, bpm, setTempo, position } = useTone();


    return (
        <div className="transport-widget">
            <div className="song-position-display numeric-transport-display">
                <div className="display-upper">
                    <span className="pos-bar">{padLeadingZeros(breakUpBarsBeatsSixteens(position).bars, 3)}</span>:<span className="pos-beat">{padLeadingZeros(breakUpBarsBeatsSixteens(position).beats, 2)}</span>:<span className="pos-ms">{breakUpBarsBeatsSixteens(position).sixteens}</span>
                </div>
                <div className="display-lower">
                    <span className="display-name">Song position</span>
                </div>
            </div>
            <div className="tempo-display numeric-transport-display">
                <div className="display-upper">
                    <input type="number" min="20" max="400" className="tempo-value-display" value={bpm} onChange={setTempo} /><span>BPM</span>
                </div>
                <div className="display-lower">
                    <span className="display-name">Tempo</span>
                </div>
            </div>
            
            <div className="play-button transport-button button-color" onClick={togglePlay} >
                <FontAwesomeIcon icon={isPlaying ? faStop : faPlay}/> 
            </div>
           
        </div>
    );
}

export default Transportbar;
