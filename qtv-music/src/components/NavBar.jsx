import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ShoppingIcon from './navbar/shoppingIcon';
import SearchBar from './navbar/searchBar';
import LoginIcon from './navbar/logIn';
import AccountIcon from './navbar/account';
import './NavBar.scss';


const NavBar = ({ user, shoppingCart }) => {

    return ( 
        <nav className="navbar-desktop d-flex justify-content-between align-items-center">
            <div className="navbar-container d-flex justify-content-between align-items-center">
                <Link className="navbar-logo" to="/">
                    <h1>QTV Music</h1>
                </Link>
                <div className="navbar-page" >
                    <NavLink 
                        exact
                        className="navbar-page-item" 
                        activeClassName="activeLink"
                        to="/">
                            Trang Chủ
                    </NavLink>
                    <NavLink 
                        className="navbar-page-item" 
                        activeClassName="activeLink"
                        to="/san-pham">
                            Sản Phẩm
                    </NavLink>
                    <NavLink 
                        className="navbar-page-item" 
                        activeClassName="activeLink"
                        to="/blog">
                            Blog
                    </NavLink>
                    <NavLink 
                        className="navbar-page-item" 
                        activeClassName="activeLink"
                        to="/lien-he">
                            Liên Hệ
                    </NavLink>
                </div>
                <div className="navbar-icon d-flex">
                    <SearchBar />
                    <NavLink 
                        style ={{marginLeft:"25px"}}
                        title = "Giỏ Hàng"
                        to="/gio-hang">
                            <ShoppingIcon shoppingCart = {shoppingCart}/>
                    </NavLink>
                    <NavLink 
                        style ={{marginLeft:"25px"}}
                        title = {user ? `Xin chào ${user.name}` : "Đăng Nhập"}
                        to={user ? "/tai-khoan" : "/dang-nhap"}>
                            {user ? <AccountIcon /> : <LoginIcon/>}
                    </NavLink>
                </div>
                </div>
        </nav>
     );
}
 
export default NavBar;
