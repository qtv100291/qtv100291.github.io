import React from 'react';
import './albumOfTheWeek.scss';
import {Link} from 'react-router-dom';

const AlbumOfTheWeek = ({ 
                        id, 
                        albumName, 
                        bandName, 
                        albumCover, 
                        price, 
                        description, }) => {
    const imagePath = '/' + albumCover + '/cover.jpg'
    const productPath = '/san-pham/' + (albumName && albumName.replace(/ /g, "-")) + '-' +id;
    return ( 
        <section className="album-section">
            <div className="album-title d-flex align-items-center">
                <div className = "title-point"></div>
                <h2>Mỗi Tuần Một Album Với QTV Music</h2>
            </div>
            <div className="album-the-week-container d-flex justify-content-between">
                <div className="album-the-week-photo">
                    <img src={imagePath} alt={albumName} />
                </div>
                <div className="album-the-week-content">
                    <h3 className="album-name">{albumName}</h3>
                    <h3 className="album-band-name">{bandName}</h3>
                    <h3 className="album-price">{price} VND</h3>
                    <div className="album-the-week-description">
                        {description && description.map((des,index) => <p key={index}>{des}</p>)}
                    </div>
                    <Link to={productPath}>
                    <div className="button-see-more d-flex justify-content-center align-items-center">Xem Thêm</div>
                    </Link>             
                </div> 
            </div>
        </section> 
     );
}
 
export default AlbumOfTheWeek;