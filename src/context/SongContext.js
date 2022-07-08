import React, { useState } from "react";
import emptySong from "../resources/song.json"; const SongContext = React.createContext();


const SongProvider = ({ children }) => {


    const [song, setSong] = useState(emptySong);
    const adjustSong = (newSong) => {
        console.log(newSong);
        setSong(newSong);
    }

    const adjustTrack = (entry) => {
        console.log(entry);
        const newSong = {
            ...song,
            tracks:entry.tracks,

        }
        console.log(newSong);
        setSong(newSong);
    }

    const data = {
        song,
        adjustSong,
        adjustTrack,

    };

    return (
        <SongContext.Provider value={data}>{children}</SongContext.Provider>
    );
};

export { SongContext, SongProvider };