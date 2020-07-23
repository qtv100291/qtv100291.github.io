import React from 'react';
import './navbarIconItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LoginIcon = () => {
    return ( 
    <div className="user-icon-part navbar-icon-item">
        <FontAwesomeIcon  icon = "user-lock" className="real-font-awesome icon-navbar"/>
    </div>);
}

export default LoginIcon;

