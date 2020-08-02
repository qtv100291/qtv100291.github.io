import React from 'react';
import './breadCrumb.scss';
import { Link } from 'react-router-dom';
import addfunc from '../../ultis/additionalFunction';

const BreadCrumb = ({ title, titleParent }) => {
    return ( 
        <div className="banner-breadcrumb">
            <div className="overlay-banner-breadcrumb"></div>
            <h2>{title || titleParent}</h2>
            <ol className="breadcrumb-line d-flex justify-content-center align-items-center">
                <li><Link to="/">Trang Chủ</Link></li>
                <span>|</span>
                <li>{title ?  
                    <Link to={`/${addfunc.titlePath(titleParent)}`}>{titleParent}</Link>
                    : titleParent}
                </li>
                {title && <span>|</span>}
                {title && <li>{title}</li>}
            </ol>
        </div>
    );
}
 
export default BreadCrumb;
