import React,{ Component } from 'react';
import './navbarIconItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SearchBar extends Component {
    state = {  }
    render() { 
        return ( 
        <div className="search-bar-icon-part navbar-icon-item" title ="Tìm Kiếm">
            <FontAwesomeIcon icon = "search" className="real-font-awesome icon-navbar"/>
        </div>)
    }
}

export default SearchBar;