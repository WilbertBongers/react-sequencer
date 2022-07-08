import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const ModalWindow = ({ children, setIsOpen, hasCloseButton, addToClassName }) => {

    return (
        <>
            <div className="modal-dark-background">
                <div className={`modal-window ${addToClassName}`}>
                    <div className="modal-header">
                        {hasCloseButton && <FontAwesomeIcon icon={faXmark} className="model-window-close" onClick={() => setIsOpen({open:false})}/>}
                    </div>
                    <div className="modal-window-content">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalWindow;