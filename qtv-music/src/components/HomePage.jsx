import React, { Component } from 'react';
import CarouselFade from './homepage/carouselFade';
import AlbumHomePage from './homepage/albumHomePage';
import AlbumOfTheWeek from './homepage/albumOfTheWeek';
import FamousArtist from './homepage/famousArtist';
import Subscription from './homepage/subscription';
import PreviewModal from './common/previewModal';
import additionalFunctionDom from '../ultis/additionalFunctionDom';
import { getAlbum } from '../services/albumServiceHomePage';
import './HomePage.scss';



class HomePage extends Component {
    state = { 
        vietnameseAlbum : [],
        internationalAlbum : [],
        albumOfTheWeek: [],
        isOpeningModal : false, 
        previewId: null,
        inPreView : false
    }
    
    async componentDidMount(){
        const vietnameseAlbum  = await getAlbum(["5", "10", "14", "33"]);
        const internationalAlbum = await getAlbum(["6", "32", "26", "18"]);
        const albumOfTheWeek = await getAlbum(["23"]);
        this.setState({ vietnameseAlbum, internationalAlbum, albumOfTheWeek});
        document.title = "QTV Music";
        window.scrollTo(0, 0);
    }

    handleOpening = id => {
        additionalFunctionDom.fixBody();
        this.setState({ isOpeningModal : true, previewId : id, inPreView: true });
    }

    handleClose = () => {
        additionalFunctionDom.releaseBody();
        this.setState({ isOpeningModal : false, previewId: null, inPreView : false });
    }

    render() { 
        return (
            <main className="main-container">
                <PreviewModal   isOpeningModal = {this.state.isOpeningModal} 
                                previewId = {this.state.previewId}
                                onClose={this.handleClose}
                                inPreView = {this.state.inPreView}
                />
                <CarouselFade/>
                <AlbumHomePage 
                    title = {"Rock/Metal Việt Nam"}
                    album = {this.state.vietnameseAlbum}
                    key = {"homepage-1"}
                    onOpen = {this.handleOpening}
                />
                <AlbumHomePage
                    title = {"Rock/Metal Quốc Tế"}
                    album = {this.state.internationalAlbum}
                    key = {"homepage-2"}
                    onOpen = {this.handleOpening}
                />
                <AlbumOfTheWeek {...this.state.albumOfTheWeek[0]}/>
                <FamousArtist />
                <Subscription/>
            </main>
         );
    }
}
 
export default HomePage;
