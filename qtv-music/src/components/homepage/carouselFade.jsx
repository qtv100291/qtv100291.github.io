import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './carouselFade.scss';
import { Link } from 'react-router-dom';
import Banner1 from '../../assets/homepage-assets/banner.jpg';
import Banner2 from '../../assets/homepage-assets/banner2.jpg';
import Banner3 from '../../assets/homepage-assets/banner3.jpg';



const CarouselHomePage = () => {
    return ( 
        <Carousel fade={true} className="carousel-home-page" indicators={false} interval={7000}>
            <Carousel.Item id="carousel-main-item">
                <Link to ='/san-pham'>  
                    <div className ="carousel-banner">
                        <div className="carousel-banner-photo">
                            <img
                            className="d-block w-100"
                            src={Banner1}
                            alt="First slide"
                            />
                        </div>
                    </div>
                </Link>
                <Carousel.Caption>
                <h3>Let's Rock On With QTV Music</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Link to='/blog/chester'>
                    <div className ="carousel-banner">
                        <div className="carousel-banner-photo">
                            <img
                            className="d-block w-100"
                            src={Banner2}
                            alt="First slide"
                            />
                        </div>
                    </div>
                </Link>
                <Carousel.Caption>
                <h3>Kỷ Niệm Ba Năm Ngày Mất Chester Bennington</h3>
                <p>Cùng QTV Music tìm hiểu về cuộc đời và sự nghiệp của ca sĩ chính ban nhạc Linkin Park </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Link to='/san-pham/Human.-:II:-Nature-34'>
                    <div className ="carousel-banner">
                        <div className="carousel-banner-photo">
                            <img
                            className="d-block w-100"
                            src={Banner3}
                            alt="First slide"
                            />
                        </div>
                    </div>
                </Link>
                <Carousel.Caption>
                <h3>Human. :II: Nature</h3>
                <p>Album thứ chín của ban nhạc symphonic metal Nightwish đã có mặt tại QTV Music</p>
                </Carousel.Caption>
            </Carousel.Item>
    </Carousel>
     );
}
 
export default CarouselHomePage;