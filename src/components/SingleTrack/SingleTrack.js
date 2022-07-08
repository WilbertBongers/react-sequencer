import React from 'react';
import './style.scss';


const SingleTrack = ({ track, onPress, onMute, onSolo, id }) => {

   
    return (
        <li className={`track-display ${track.selected && "selected-track"}`} onClick={e => onPress(e)} id={id}>
            <div className="track-name">
                <span>
                    {track.name}
                </span>
            </div>
            <div onClick={e => onMute(e)} className={`track-mute ${track.mute && "muted"}`}><span>mute</span></div>
            <div onClick={e => onSolo(e)} className={`track-solo ${track.solo && "soloed"}`}><span>solo</span></div>
        </li>
    );
};

export default SingleTrack;