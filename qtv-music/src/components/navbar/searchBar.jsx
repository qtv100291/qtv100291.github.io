import React,{ Component } from 'react';
import './navbarIconItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { searchAlbum } from '../../services/albumServiceHomePage';
import { Link } from 'react-router-dom';

class SearchBar extends Component {
    state = { 
        isDisplaying: false,
        keyword : "",
        isSearching: false,
        searchResult:null
    }

    handleChangeIcon = () => {
        const isDisplaying = this.state.isDisplaying ? false : true;
        this.setState({ isDisplaying, keyword: "" });
    }

    handleSearchInput = async ({currentTarget : input}) => {
        if (input.value === "") {
            this.setState ({ searchResult:null, keyword: "" })
            return
        }
        else {
            const keyword = input.value;
            this.setState({ keyword, isSearching : true });
            const searchResult = await searchAlbum(input.value);
            this.setState ({ searchResult })
        }
    }

    renderSearchResult=( result, searchInputRaw) =>{
        const searchInput = this.removeAccents(searchInputRaw).toLowerCase();
        const resultPath = '/san-pham/' + (result.albumName && result.albumName.replace(/ /g, "-")) + '-' + result.id;
        const indexOfTextColored = this.removeAccents(result.albumName).toLowerCase()
                                                                    .indexOf(searchInput)
        const textColored = result.albumName.slice(indexOfTextColored, indexOfTextColored + searchInput.length);
        return <Link to = {resultPath} key={result.id} className="link-search-bar">
                    <div className="link-container">
                        {result.albumName.slice(0,indexOfTextColored)}<span>{textColored}</span>{result.albumName.slice(indexOfTextColored + searchInput.length)}
                    </div>
             </Link>;
    }

    removeAccents = str => {
        return str.normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
    
    render() { 
        const { searchResult, keyword, isDisplaying, isSearching } = this.state
        return ( 
            <div className="search-bar-icon-part navbar-icon-item" title ="Tìm Kiếm">
                <div className="search-bar-icon d-flex justify-content-center align-items-center" onClick={this.handleChangeIcon}>
                    {!isDisplaying ? <FontAwesomeIcon icon = "search" className="real-font-awesome icon-navbar"/> : <FontAwesomeIcon icon = "times" className="real-font-awesome icon-navbar"/>}
                </div>
                <div className={!isDisplaying ? "search-bar d-flex align-items-center" : "search-bar displaying d-flex align-items-center"}>
                    <input type="text" 
                        onChange={this.handleSearchInput}
                        onBlur = {this.handle} 
                        placeholder="Tìm Kiếm..." 
                        id="search-bar-input" 
                        value={keyword} 
                        autoComplete="off"
                    />
                    <div className="icon-search-container">
                        <FontAwesomeIcon icon = "search" className="real-font-awesome icon-search"/>
                    </div>
                    <div className={isSearching ? "result displaying" : "result"}>
                        {searchResult && 
                        (searchResult.length === 0 ? 
                        <p>Không có sản phẩm phù hợp</p> 
                        : searchResult.map(album => this.renderSearchResult( album, keyword )))}
                    </div>
                </div>
                
            </div>)
    }
}

export default SearchBar;

