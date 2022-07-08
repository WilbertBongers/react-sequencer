import React from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import axios from "axios";

const RegisterForm = ({ setIsOpen }) => {
    const { register, handleSubmit } = useForm();

    async function onFormSubmit(data) {
        try {
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                "username": data.username,
                "email": data.email,
                "password": data.password,
                "role": ["user"]
            });
            // log het resultaat in de console
            console.log(result.data);

            setIsOpen({
                open: true,
                type: "login",
            });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onFormSubmit)} className="register-form">
                
                    <label htmlFor="login-name">
                        User name:
                    <input
                            type="username"
                            id="username"
                            {...register("username")}
                        />
                    </label>

                    <label htmlFor="login-email">
                        Email adres:
                    <input
                            type="email"
                            id="email"
                            {...register("email")}
                        />
                    </label>

                    <label htmlFor="password">
                        Password:
                    <input
                            type="password"
                            id="password"
                            {...register("password")}
                        />
                    </label>
                <button type="submit">
                    Send
                </button>
            </form>
        </>
    );
};

export default RegisterForm;