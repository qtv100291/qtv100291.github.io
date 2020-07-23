import React from 'react';

const TrackList = ({listSong, listSongDuration}) => {
    return ( 
        <div className = "track-list-container d-flex justify-content-between">
            <div className = "list-song">
                { listSong.map(( song , index ) => <p key = {index}>{song}</p>) } 
            </div>
            <div className = "list-song-duration">
                { listSongDuration.map(( songDuration , index ) => <p key = {index}>{songDuration}</p>) } 
            </div>
        </div>
     );
}

export default TrackList;