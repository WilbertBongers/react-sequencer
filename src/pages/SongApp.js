
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GridEdit from "../components/GridEdit/Gridedit.js";
import Navbar from "../components/Navbar/Navbar.js"
import TrackDisplay from "../components/TrackDisplay/Trackdisplay.js";
import Transportbar from "../components/Transport/Transport.js";
import Mixer from "../components/Mixer/Mixer.js"
import SongWidget from "../components/SongWidget/SongWidget.js";
import UserWidget from "../components/UserWidget/UserWidget.js";
import "./styles.scss";
import useTone from "../hooks/useTone";
import useAuth from "../hooks/useAuth";
import useSong from "../hooks/useSong";
import ModalWindow from "../components/ModalWindow/ModalWindow.js";
import AudioContextConsent from "../components/AudioContextConsent/AudioContextConsent.js";
import axios from "axios";

function SongApp() {
    const { audioContextStarted, startContext } = useTone();
    const [isAudioConsentModalOpen, setAudioConsentModalOpen] = useState(audioContextStarted);
    const [songModalState, setSongModalState] = useState({
        open: false,
        type: "load"
    });
    const [userModalState, setUserModalState] = useState({
        open: false,
        type: "login",
    });
    const [isType, setType] = useState("edit");
    const { isAuth } = useAuth();
    const navigate = useNavigate();
    const { adjustSong } = useSong();
    const ApiKey = "$2b$10$rMNkHe2l9mQpvn87wwW4OuWiQo2Fo68HbA/H/cXcQ4w.qlpBPKQWW";
    const EmptySongId = "62c2da274bccf21c2ecc2568";
    const changeType = (type) => {
        setType(type);
    }

    const setUserModalType = (type) => {
        setUserModalState({
            open: true,
            type: type,
        });
    }

    const setSongModalType = (type) => {
        setSongModalState({
            open: true,
            type: type,
        });
    }

    const { id } = useParams();

    useEffect(() => {
        console.log("SongApp mounted");
        if (isAuth && id) {
            console.log("SongApp mounted with id: "+id);
            getSongFromBin(id);
        } 
        return () => { }
    }, [])

    useEffect(() => {
        console.log("SongApp REmounted");
        if (isAuth && id) {
            console.log("SongApp REmounted with id: "+id);
            getSongFromBin(id);
        } 
        return () => {
        }
    }, [id])

    async function getSongFromBin(id) {
        try {
            
            const result = await axios.get(`https://api.jsonbin.io/v3/b/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": `${ApiKey}`,
                },
            });
            console.log("getSongFromBin");
            adjustSong(result.data.record);
        } catch (e) {
            console.error(e);
        }

    }

    return (
        <>
            {isAudioConsentModalOpen && <ModalWindow
                setIsOpen={setAudioConsentModalOpen}
                hasCloseButton={false}
                addToClassName="small">
                <AudioContextConsent
                    setIsOpen={setAudioConsentModalOpen}
                    startContext={startContext} />
            </ModalWindow>}
            {songModalState.open && <ModalWindow
                setIsOpen={setSongModalState}
                hasCloseButton={true}
                addToClassName="normal">
                <SongWidget
                    type={songModalState.type} 
                    setIsOpen={setSongModalState}/>
            </ModalWindow>}
            {userModalState.open && <ModalWindow
                setIsOpen={setUserModalState}
                hasCloseButton={true}
                addToClassName="small">
                <UserWidget
                    type={userModalState.type}
                    setIsOpen={setUserModalState} />
            </ModalWindow>}
            <Navbar
                title={isType ? isType : ""}
                setEditType={changeType}
                setSongModalType={setSongModalType}
                setUserModalType={setUserModalType}
            />
            <div className="content-container">
                {isType === "edit" &&
                    <>
                        <div id="track-container">
                            <TrackDisplay />
                        </div>
                        <div id="grid-container">
                            <GridEdit />
                        </div>
                        <div id="transport-container">
                            <Transportbar />
                        </div>
                    </>}
                {isType === "mixer" &&
                    <>
                        <div id="mixer-container">
                            <Mixer />
                        </div>
                        <div id="transport-container">
                            <Transportbar />
                        </div>
                    </>}
            </div>
        </>
    );
}

export default SongApp;