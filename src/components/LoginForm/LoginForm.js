import React, { useState } from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth.js";
import axios from "axios";

const LoginForm = ({ setIsOpen }) => {

    const { register, handleSubmit } = useForm();
    const { login } = useAuth();
    const [error, setError] = useState(false);

    async function onFormSubmit(data) {

        try {
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                username: data.username,
                password: data.password,
            });
            // log het resultaat in de console
            console.log(result.data);

            // geef de JWT token aan de login-functie van de context mee
            login(result.data.accessToken);
            setIsOpen({
                open: false,
                type: "",
            });
        } catch (e) {
            console.error(e);
            setError(true);
        }
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="login-form">
            <label htmlFor="login-name" className={error ? "login-error" : ""}>
                User name:
                    <input
                    type="username"
                    id="login-name"
                    {...register("username")}
                />
            </label>
            <label htmlFor="password" className={error ? "login-error" : ""}>
                Password:
                    <input
                    type="password"
                    id="password"
                    {...register("password")}
                />
            </label>

            <button type="submit">
                Login
        </button>
        </form>
    );
};

export default LoginForm;