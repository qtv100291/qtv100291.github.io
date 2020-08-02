import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.scss';

const NavBar = () => {
    return ( 
        <footer>
            <nav className="footer-desktop d-flex justify-content-between align-items-center">
                <div className="footer-container d-flex justify-content-between align-items-center">
                    <Link className="footer-logo" to="/">
                        <h1>QTV Music</h1>
                    </Link>
                    <div className="footer-page" >
                        <Link 
                            className="footer-page-item" 
                            to="/huong-dan-mua-hang">
                                Hướng Dẫn Mua Hàng
                        </Link>
                        <Link 
                            className="footer-page-item" 
                            to="/dieu-khoan-dich-vu">
                                Điều Khoản Dịch Vụ
                        </Link>
                    </div>
                        <div className="footer-icon d-flex">
                            <a href="https://www.facebook.com/" style ={{color: "#4267b2"}} title="facebook">
                                <FontAwesomeIcon icon={['fab','facebook']}/>
                            </a>
                            <a href="https://twitter.com/home" title="twitter" style={{color: "#55ACEE"}}>
                                <FontAwesomeIcon icon={['fab','twitter-square']}/>
                            </a>
                            <a href="https://www.instagram.com/" title="instagram" style={{color: "#f04e40"}}>
                            <FontAwesomeIcon icon={['fab','instagram']}/>
                            </a>
                            <a href="https://www.youtube.com/" title="youtube" style ={{color: "red"}}>
                                <FontAwesomeIcon icon={['fab','youtube']}/>
                            </a>
                    </div>
                </div>
            </nav>
            <div className="footer-about-website d-flex justify-content-center">
                    <h5>QTV Music @ 2020 - <span>About This Website</span></h5>
            </div>
        </footer>
        
     );
}
export default NavBar;


