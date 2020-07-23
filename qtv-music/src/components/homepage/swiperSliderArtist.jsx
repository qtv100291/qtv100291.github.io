import React from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import bucTuong from '../../assets/band/buc-tuong-1.jpg';
import metallica from '../../assets/band/metallica.jpg';
import dragonForce from '../../assets/band/dragonforce-1.jpg';
import unlimited from '../../assets/band/unlimited.jpg';
import linkinPark from '../../assets/band/linkin-park.jpg';
import nightWish from '../../assets/band/night-wish-1.jpg';
import './swiperSilderArtist.scss'

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Link } from 'react-router-dom';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default () => {
  return (
        <Swiper
        spaceBetween={40}
        slidesPerView={3}
        navigation
        >
        <SwiperSlide >
            <Link to="/">
                <div className="slider-artist-item">
                    <img src={bucTuong} alt="Bức Tường"/>
                    <h4 className="overlay-slider-item d-flex align-items-center">Bức Tường</h4>
                </div>
            </Link>
        </SwiperSlide>
        <SwiperSlide>
        <Link to="/">
            <div className="slider-artist-item">
                <img src={metallica} alt="Metallica"/>
                <h4 className="overlay-slider-item d-flex align-items-center">Metallica</h4>
            </div>
        </Link>
        </SwiperSlide>
        <SwiperSlide>
            <Link to="/">
                <div className="slider-artist-item">
                    <img src={nightWish} alt="Nightwish"/>
                    <h4 className="overlay-slider-item d-flex align-items-center">Nightwish</h4>
                </div>
            </Link>
        </SwiperSlide>
        <SwiperSlide>
        <Link to="/">
            <div className="slider-artist-item">
                <img src={unlimited} alt="Unlimited"/>
                <h4 className="overlay-slider-item d-flex align-items-center">UnlimiteD</h4>
            </div>
        </Link>
        </SwiperSlide>
        <SwiperSlide>
            <Link to="/">
                <div className="slider-artist-item">
                    <img src={linkinPark} alt="Linkin Park"/>
                    <h4 className="overlay-slider-item d-flex align-items-center">Linkin Park</h4>
                </div>
            </Link>
        </SwiperSlide>
        <SwiperSlide>
            <Link to="/">
                <div className="slider-artist-item">
                    <img src={dragonForce} alt="DragonForce"/>
                    <h4 className="overlay-slider-item d-flex align-items-center">DragonForce</h4>
                </div>
            </Link>
        </SwiperSlide>
    </Swiper>
  );
};