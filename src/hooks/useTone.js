import { useContext } from 'react';
import { ToneContext } from '../context/ToneContext';

// context consumer hook
const useTone = () => {
    // get the context
    const context = useContext(ToneContext);

    // if `undefined`, throw an error
    if (context === undefined) {
        throw new Error("useToneContext was used outside of its Provider");
    }

    return context;
};
export default useTone; 