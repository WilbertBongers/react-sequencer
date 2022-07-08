import React from "react";
import "./style.scss";
import LoadSong from "../LoadSong/LoadSong.js";
import SaveSong from "../SaveSong/SaveSong.js"

const SongWidget = ({ type, setIsOpen }) => { 

    return (
        <>
            { type === "load" && <LoadSong setIsOpen={setIsOpen} />}
            { type === "save" && <SaveSong setIsOpen={setIsOpen} />}
        </>
    );
};

export default SongWidget;