import React from 'react';
import './style.scss';

const SingleChannel = ({ track, type , onSlide}) => {


    return (
        <>
            { type === "channel" &&
                <div className="channel-strip single-channel">
                    <div className="channel-name"><span>{track.name}</span></div>
                    <input type="range" min="-100" max="0" className="slider" id="myRange" orient="vertical" onChange={onSlide} />
                </div>

            }
            { type === "master" &&
                <div className="channel-strip master-channel">
                    <div className="channel-name"><span>{track.name}</span></div>
                    <input type="range" min="-100" max="0"  className="slider" id="myRange" orient="vertical" onChange={onSlide}/>
                </div>
            }
        </>
    );
};

export default SingleChannel;