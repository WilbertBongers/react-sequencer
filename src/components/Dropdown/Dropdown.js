import React from 'react';
import { Link } from 'react-router-dom'
import './style.scss';

const Dropdown = ({ submenu, isActive, dropdownControl }) => {
  
    return (
        <ul className={`sub-menu ${isActive ? 'visible' : 'inVisible'}`}>
            {submenu.map((item, index) => {
                return (
                    <li key={index}>
                        <Link to={item.link} onClick={() => dropdownControl(false)}>{item.title}</Link>
                    </li>
                )
            })}
        </ul>
    );
};

export default Dropdown;