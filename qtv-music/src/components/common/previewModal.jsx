import React, {Component} from 'react';
import { getAlbumDetail } from '../../services/albumServiceHomePage';
import AudioPlayer from '../common/audioPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './previewModal.scss'
import { createRef } from 'react';

class PreviewModal extends Component {
    state = { 
        album :{}
    }

    myModal = createRef();

    async componentDidUpdate(prevProps) {
        if (this.props.isOpeningModal !== prevProps.isOpeningModal){
            if (this.props.previewId === null) return
            const {data : album} = await getAlbumDetail(this.props.previewId);
            this.setState({ album });
            this.myModal.current.scrollTo (0,0);
        }
    }

    handleCloseModal= () => {
        this.props.onClose()
    }

    render() { 
        const {
            id,
            albumName, 
            bandName, 
            albumCover, 
            price, 
            // previewSong, 
            // previewSongName, 
            description} = this.state.album;

        const imagePath = '/' + albumCover + '/cover.jpg';
        // const mp3Path = '/' + albumCover + '/' + previewSong;
        const productPath = '/san-pham/' + (albumName && albumName.replace(/ /g, "-")) + '-' +id;
        return ( 
            <div className={this.props.isOpeningModal ?  
                            "preview-modal active-mode" 
                            : "preview-modal"}
                > 
                <div className="preview-modal-container d-flex justify-content-between align-items-center" >
                    <div className="close-button d-flex justify-content-center align-items-center" onClick={this.handleCloseModal}><FontAwesomeIcon icon="times-circle"/></div>
                    <div className="preview-modal-photo">
                        <img src={imagePath} alt={albumName}/>
                    </div>
                    <div className="preview-modal-content" ref={this.myModal}>
                        <Link to={productPath} onClick={this.handleCloseModal}>
                            <h3 className="album-name">{albumName}</h3>
                        </Link>
                        <h3 className="album-band-name">{bandName}</h3>
                        <h3 className="album-price">{price} VND</h3>
                        {/* <AudioPlayer src ={mp3Path} songName = {previewSongName} inPreView={this.props.inPreView}/> */}
                        <div className="button-add-to-cart d-flex justify-content-center align-items-center">Thêm Vào Giỏ Hàng</div>
                        <div className="preview-modal-presentation">
                            <h4 className="preview-modal-presentation-title">Giới Thiệu : </h4>
                            <div className="album-description">
                                {description && description.map( (x,i) => <p key={i}>{ x }</p> )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default PreviewModal;