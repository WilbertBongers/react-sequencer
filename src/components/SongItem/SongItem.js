import React from "react";
import "./style.scss"; 
import { format } from 'fecha';

const SongItem = ({ title, createdAt, id, clickHandler, selected}) => {



    return (
        <>
            <li onClick={(e) => clickHandler(e, id)} className={`song-item-container ${selected ? "selected" : ""}`}>
                    <h3>{title}</h3>
                    <span>{format(new Date(createdAt), 'isoDate')}</span>
            </li>
        </>
    );
};

export default SongItem;