import React from "react";
import "./style.scss";
import useAuth from "../../hooks/useAuth.js";

const UserProfile = () => {
  
    const { user } = useAuth();

    return (
        <>
            <p> {JSON.stringify(user)} </p>
        </>
    );
};

export default UserProfile;