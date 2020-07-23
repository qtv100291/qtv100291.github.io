import React, { Component } from 'react';
import './navbarIconItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ShoppingIcon extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="shopping-icon-part navbar-icon-item">
                <FontAwesomeIcon icon = "shopping-bag" className="real-font-awesome icon-navbar"/>
                <strong className="d-flex justify-content-center align-items-center">12</strong>
            </div>
        );
    }
}
 
export default ShoppingIcon;