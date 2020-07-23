import React from 'react';
import AlbumItem from '../common/albumItem';
import './albumHomePage.scss'

const AlbumHomePage = ({title, album, onOpen}) => {
    return ( 
    <section className="album-section">
        <div className="album-title d-flex align-items-center">
            <div className = "title-point"></div>
            <h2>{title}</h2>
        </div>
        
        <div className="album-container d-flex justify-content-between">
            {
                album.map(albumItem => <AlbumItem {...albumItem} key={albumItem.id} onOpen = {onOpen}/>)
            }
        </div>
    </section> 
    );
}
 
export default AlbumHomePage;