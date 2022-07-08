import React from "react";
import "./style.scss";
import useAuth from "../../hooks/useAuth";
import LoginForm from "../LoginForm/LoginForm.js";
import RegisterForm from "../RegisterForm/RegisterForm.js"
import UserProfile from "../UserProfile/UserProfile.js";

const UserWidget = ({ type, setIsOpen }) => {

    const { logout, } = useAuth();

    const logoutFunc = () => {
        logout();
        setIsOpen({ 
            open: false,
            type: "",
        });
    }

    return (
        <>
            { type === "login" && <LoginForm setIsOpen={setIsOpen} /> }
            { type === "register" && <RegisterForm setIsOpen={setIsOpen} />}
            { type === "logout" && 
            <div className="logout-content">
                <p>Wilt u uitloggen?</p>
                <button onClick={logoutFunc}>Logout</button> 
            </div>}
            { type === "profile" && <UserProfile /> }
        </>
    );
};

export default UserWidget;