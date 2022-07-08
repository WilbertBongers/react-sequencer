import React from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth.js";
import useSong from "../../hooks/useSong.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { REACT_APP_JSONBIN_KEY, REACT_APP_JSONBIN_COLLECTION_ID } from "../../environment";

const SaveSong = ({ setIsOpen }) => {

    const { isAuth } = useAuth();
    const { song, adjustSong } = useSong();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    
    async function onFormSubmit(data) {
        adjustSong({
            ...song,
            "name": data.name,
        })
        const headers = {
            "Content-Type": "application/json",
            "X-Master-Key": `${REACT_APP_JSONBIN_KEY}`,
            "X-Bin-Name": `${data.name}`,
            "X-Collection-Id": `${REACT_APP_JSONBIN_COLLECTION_ID}`
        };
        try {
            const result = await axios.post(`https://api.jsonbin.io/v3/b`, song, { headers });
            console.log(result);
            navigate(`/song/${result.data.metadata.id}`);
            setIsOpen({
                open: false, 
                type: "load",
            })
        }
        catch (e) {
            console.error(e);
           
        }        
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="savesong-form">
              
                <label htmlFor="name">
                    Song name:
                    <input
                        type="name"
                        id="name"
                        {...register("name")}
                    />
                </label>
            <button type="submit">
                Send
        </button>
        </form>
        
    );
};

export default SaveSong;