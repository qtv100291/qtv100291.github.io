import React, { Component } from 'react';
import BreadCrumb from './common/breadCrumb';
import AudioPlayer from './common/audioPlayer';
import AlbumHomePage from './homepage/albumHomePage';
import PreviewModal from './common/previewModal';
import { getAlbumDetail, getRelatedAlbum } from '../services/albumServiceHomePage';
import addfunc from '../ultis/additionalFunction';
import additionalFunctionDom from '../ultis/additionalFunctionDom';
import shoppingCartFunc from '../ultis/shoppingCartFunc';
import'./AlbumDetail.scss';

class AlbumDetail extends Component {
    state = { 
        album :{},
        currentTab:"1",
        relatedAlbum: [],
        isOpeningModal : false, 
        previewId: null,
        inPreView : false
    }

    async componentDidMount(){
        const albumId = addfunc.getAlbumId(this.props.location.pathname);
        const { data : album } = await getAlbumDetail(albumId);
        await this.setState({ album });
        const relatedAlbum  = await getRelatedAlbum(this.state.album.bandName, this.state.album.country, this.state.album.id);
        this.setState( { relatedAlbum } )
        document.title = this.state.album.albumName;
        window.scrollTo(0, 0);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname){
            this.componentDidMount();
            this.setState({currentTab : "1"})
        }
    }

    handleOpening = id => {
        additionalFunctionDom.fixBody();
        this.setState({ isOpeningModal : true, previewId : id, inPreView: true });
    }

    handleClose = () => {
        additionalFunctionDom.releaseBody();
        this.setState({ isOpeningModal : false, previewId: null, inPreView : false });
    }

    handleActiveTab = ({currentTarget : tab})=>{
        const currentTab = tab.getAttribute('data-button')
        this.setState({ currentTab })
    }

    handleAddToCart = () =>{
        const { id, albumName, price, albumCover, bandName } = this.state.album;
        const imagePath = '/' + albumCover + '/cover.jpg';
        const newItem = new shoppingCartFunc.Item(id, albumName, price, imagePath, bandName);
        this.props.updateShoppingCart(newItem);
    }

    render() { 
        const { releaseYear,
                albumName, 
                bandName, 
                albumCover, 
                price, 
                description,
                previewSong, 
                previewSongName, 
                listSong, 
                listSongDuration} = this.state.album;

        const imagePath = '/' + albumCover + '/cover.jpg';
        const mp3Path = '/' + albumCover + '/' + previewSong;

        return ( 
            <main className="section-album-detail">
                <PreviewModal   isOpeningModal = {this.state.isOpeningModal} 
                                previewId = {this.state.previewId}
                                onClose={this.handleClose}
                                inPreView = {this.state.inPreView}
                                updateShoppingCart={this.props.updateShoppingCart}
                />
                <BreadCrumb title={albumName} titleParent="Sản Phẩm"/>
                <section className="section-album-detail-container d-flex justify-content-between">
                    <div className="album-cover-photo">
                        <div className="album-cover-photo-container">
                            <img src={imagePath} alt={albumName}/>
                        </div>
                    </div>
                    <div className="album-detail">
                        <h3 className="album-name">{albumName}</h3>
                        <h3 className="album-band-name">{bandName} - {releaseYear}</h3>
                        <h3 className="album-price">{price} VND</h3>
                        <AudioPlayer src ={mp3Path} songName = {previewSongName}/>
                        <div className="button-add-to-cart d-flex justify-content-center align-items-center"
                            onClick={this.handleAddToCart}
                            >Thêm Vào Giỏ Hàng
                        </div>
                        <div className="product-presentation">
                            <div className="product-presentation-header d-flex" >
                                <div className={this.state.currentTab === "1" ?
                                                "header-item d-flex justify-content-center align-items-center active-tab"
                                                :"header-item d-flex justify-content-center align-items-center "}
                                    onClick = {this.handleActiveTab}
                                    data-button ="1"
                                >
                                    Giới Thiệu
                                </div>
                                <div 
                                    className={this.state.currentTab === "2" ? 
                                                "header-item d-flex justify-content-center align-items-center active-tab"
                                                : "header-item d-flex justify-content-center align-items-center"}
                                    onClick = {this.handleActiveTab}
                                    data-button ="2"
                                >
                                    Track List
                                </div>
                            </div>
                            <div className="product-presentation-content">
                                <div className={this.state.currentTab === "1" ?
                                                "album-description tab-content active-tab-content"
                                                :"album-description tab-content"}>
                                    {description && description.map( (x,i) => <p key={i}>{ x }</p> )}
                                </div>
                                <div className={this.state.currentTab === "2" ?
                                                "album-track-list justify-content-between tab-content active-tab-content"
                                                :"album-track-list justify-content-between tab-content"}>
                                    <div className="album-track-list-song">
                                        {listSong && listSong.map( (x,i) => <p key={i}>{i+1}. {x}</p> )}
                                    </div>
                                    <div className="album-track-list-song-duration ">
                                        {listSongDuration && listSongDuration.map( (x,i) => <p key={i}>{addfunc.songTimeDuration(x)}</p> )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="related-album">
                    <AlbumHomePage 
                        title = {"Có Thể Bạn Cũng Quan Tâm"}
                        album = {this.state.relatedAlbum}
                        onOpen = {this.handleOpening}
                    />
                </section>
            </main>
        );
    }
}
 
export default AlbumDetail;