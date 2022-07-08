import React from "react";
import "./style.scss";
import { useState } from "react";
import useAuth from '../../hooks/useAuth.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen, faLock } from "@fortawesome/free-solid-svg-icons";

function Navbar({ title, setEditType, setSongModalType, setUserModalType }) {

    const [dropdownMenu, setDropdownMenu] = useState(false);
    const { isAuth } = useAuth();

    const toggleDropdownMenus = (menu) => {
        if (dropdownMenu === menu && dropdownMenu !== false) {
            setDropdownMenu(false);
        } else {
            setDropdownMenu(menu);
        }
    }

    const dropDownMenuEditType = (type) => {
        setEditType(type);
        setDropdownMenu(false);
    }

    const dropdownMenuSong = (type) => {
        setSongModalType(type);
        setDropdownMenu(false);
    }

    const dropDownMenuUser = (type) => {
        setUserModalType(type);
        setDropdownMenu(false);
    }


    return (
        <>
            <nav>
                <ul className="top-menu">
                    <li className="menu-item-container left-menu-pos">
                        {isAuth ?
                            <div className='menu-item-button' onClick={() => { toggleDropdownMenus("Song"); }} >
                                Song
                            </div>
                            :
                            <div className='menu-item-button' >
                                Song
                            </div>
                        }

                        <ul className={`sub-menu ${dropdownMenu === "Song" ? 'visible' : 'inVisible'}`}>
                            {isAuth &&
                                <>
                                    <li onClick={() => dropdownMenuSong("load")}>
                                        Load song
                                </li>
                                    <li onClick={() => dropdownMenuSong("save")}>
                                        Save song
                                </li>
                                </>
                            }
                        </ul>
                    </li>
                    <li className="menu-item-container left-menu-pos">
                        <div className='menu-item-button' onClick={() => { toggleDropdownMenus("Edit"); }} >
                            Edit
                        </div>
                        <ul className={`sub-menu ${dropdownMenu === "Edit" ? 'visible' : 'inVisible'}`}>
                            <li onClick={() => dropDownMenuEditType("edit")}>
                                Grid edit
                            </li>
                            <li onClick={() => dropDownMenuEditType("mixer")}>
                                Mixer
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item-container right-menu-pos">
                        <div className='menu-item-button' onClick={() => { toggleDropdownMenus("User"); }} >
                            <span>User</span>
                            {isAuth ? <FontAwesomeIcon icon={faLockOpen} /> : <FontAwesomeIcon icon={faLock} />}
                        </div>
                        <ul className={`sub-menu ${dropdownMenu === "User" ? 'visible' : 'inVisible'}`}>
                            {isAuth ?
                                <>
                                    <li onClick={() => dropDownMenuUser("profile")}>
                                        Edit profile
                                </li>

                                    <li onClick={() => dropDownMenuUser("logout")}>
                                        Logout
                                </li>
                                </>
                                :
                                <>
                                    <li onClick={() => dropDownMenuUser("login")}>
                                        Login
                                </li>
                                    <li onClick={() => dropDownMenuUser("register")}>
                                        Register
                                </li>
                                </>
                            }
                        </ul>
                    </li>
                </ul>
                <div className="menu-devider-top"></div>
                <div className="title-bar">
                    <h2 className="title-bar-title">{title}</h2>
                </div>
                <div className="menu-devider-bottom"></div>
            </nav>
        </>
    );
};

export default Navbar;