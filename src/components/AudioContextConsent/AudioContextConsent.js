import React from 'react';
import './style.scss';

const AudioContextConsent = ({startContext, setIsOpen}) => {

    return (
        <div className="audiocontext-content">
            <p>Geef toestemming dat de browser audio afspeelt</p>
                <button className="audiocontext-start-button"
                    onClick={() => {
                        startContext();
                        setIsOpen(false);
                    }}>Toestaan</button>
        </div>
    );
};

export default AudioContextConsent;