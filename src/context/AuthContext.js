import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        
        const token = localStorage.getItem('token');

        // als er WEL een token is, haal dan opnieuw de gebruikersdata op
        if (token) {
            try {
                const decoded = jwt_decode(token);
                getUserData(decoded.sub, token);
            }
            catch (e) {
                console.error(e);
            }
            
        } else {
            // als er GEEN token is doen we niks, en zetten we de status op 'done'
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    const login = (JWT) => {
        
        localStorage.setItem('token', JWT);
        const decoded = jwt_decode(JWT);
        getUserData(decoded.sub, JWT);
    }

    const logout = () => {
        localStorage.clear();
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });

        console.log('Gebruiker is uitgelogd!');
    }

    async function getUserData(id, token){
        try {
            // haal gebruikersdata op met de token en id van de gebruiker
            const result = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            // zet de gegevens in de state
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                },
                status: 'done',
            });

            // als er een redirect URL is meegegeven (bij het mount-effect doen we dit niet) linken we hiernnaartoe door
            // als we de history.push in de login-functie zouden zetten, linken we al door voor de gebuiker is opgehaald!
            
        } catch (e) {
            console.error(e);
            // ging er iets mis? Plaatsen we geen data in de state
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}


export { AuthContext, AuthProvider };