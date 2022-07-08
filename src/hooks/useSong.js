import { useContext } from 'react';
import { SongContext } from '../context/SongContext';

// context consumer hook
const useSong = () => {
    // get the context
    const context = useContext(SongContext);

    // if `undefined`, throw an error
    if (context === undefined) {
        throw new Error("useSongContext was used outside of its Provider");
    }

    return context;
};
export default useSong; 