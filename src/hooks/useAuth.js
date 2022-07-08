import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// context consumer hook
const useAuth = () => {
    // get the context
    const context = useContext(AuthContext);

    // if `undefined`, throw an error
    if (context === undefined) {
        throw new Error("useUserContext was used outside of its Provider");
    }

    return context;
};
export default useAuth; 