import React from "react";
import "./style.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SongItem from "../SongItem/SongItem.js"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { REACT_APP_JSONBIN_KEY, REACT_APP_JSONBIN_COLLECTION_ID } from "../../environment";

const LoadSong = ({ setIsOpen }) => {
 
    const navigate = useNavigate();
    const [songList, setSongList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [songItem, setSongItem] = useState("");
   

    useEffect(() => {
        
        getBinsByUser();
        return () => { }
    }, [])


    async function getBinsByUser() {
        try {
            const result = await axios.get(`https://api.jsonbin.io/v3/c/${REACT_APP_JSONBIN_COLLECTION_ID}/bins`, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": `${REACT_APP_JSONBIN_KEY}`,
                },
            });

         
            setSongList(result.data);
            setLoading(false);
        } catch (e) {
            console.error(e);
        }
    }

    const selectSong = (e, id) => {
        console.log("select song with id: " + id);
        if (id !== songItem) {
            setSongItem(id);
        } else {
            setSongItem("");
        }
    }

    const gotoSong = () => {
        if (songItem !== "") {
            console.log("gotoSong with url: /song/"+songItem);
            navigate(`/song/${songItem}`);
            setIsOpen({
                open: false,
                type: "load",
            });
        }
    }

    return (
        <div className="widget-songlist-content">
            {loading === true ?
                <div className="songlist-waiting-container">
                    <FontAwesomeIcon icon={faSpinner} spin />
                    <p>Loading songs ...</p>
                </div>
                :
                <>
                    <ul className="songlist-container">
                        {songList.map((song, index) =>
                            <SongItem title={song.snippetMeta.name} createdAt={song.createdAt} key={index} id={song.record} clickHandler={selectSong} selected={songItem === song.record ? true : false} />
                        )}
                    </ul>
                    <div className="songlist-nav-container">
                        <div className={`songlist-button ${songItem === "" ? "disabled" : ""}`} onClick={() => gotoSong()} >
                            <span>Load</span>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default LoadSong;