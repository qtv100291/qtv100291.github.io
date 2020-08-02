import React, { Component } from 'react';
import './navbarIconItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import shoppingCartFunc from '../../ultis/shoppingCartFunc';

const ShoppingIcon = ({ shoppingCart }) => {
    return ( 
            <div className="shopping-icon-part navbar-icon-item">
                <FontAwesomeIcon icon = "shopping-bag" className="real-font-awesome icon-navbar"/>
                <strong className="d-flex justify-content-center align-items-center">
                    {shoppingCart ? shoppingCartFunc.countItemInShoppingCart(shoppingCart): 0}
                </strong>
            </div>
    );
}
 
export default ShoppingIcon;