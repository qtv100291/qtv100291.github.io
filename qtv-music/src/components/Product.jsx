import React, { Component } from 'react';
import FilterContent from './product/filterContent';
import BreadCrumb from './common/breadCrumb';
import AlbumItem from './common/albumItem';
import Dropdown from 'react-bootstrap/Dropdown';
import PaginationBasic from './common/pagination';
import PreviewModal from './common/previewModal';
import { getAllAlbum } from '../services/albumServiceHomePage';
import addfunc from '../ultis/additionalFunction';
import additionalFunctionDom from '../ultis/additionalFunctionDom';
import './Product.scss';

class Product extends Component {
    state = { 
        vietnameseFilter: [],
        internationalFilter : [],
        album : [],
        selectedFilterValue : null,
        selectedValueSort : "Tên Từ A Đến Z",
        sortOrderBy : "Tên Từ A Đến Z",
        albumPerPage : 12,
        currentPage : 1,
        isOpeningModal : false, 
        previewId: null,
        inPreView : false
     }

    async componentDidMount() {
        const { data : albumRaw } = await getAllAlbum();
        const album = addfunc.sortAToZ(albumRaw);
        const vietnameseFilter = addfunc.filterMusic("Việt Nam", album);
        const internationalFilter = addfunc.filterMusic("Quốc Tế", album);
        const selectedFilterValue = this.props.location.state ? this.props.location.state.band : null;
        this.setState({vietnameseFilter, internationalFilter, album, selectedFilterValue});
        document.title = `Sản Phẩm`;
        window.scrollTo(0, 0);
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.location.state !== this.props.location.state){
            this.setState({selectedFilterValue : null});
            return
        }
        if (prevState.selectedFilterValue !== this.state.selectedFilterValue && this.state.selectedFilterValue === null){
            this.setState({selectedFilterValue : null});
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

    handleSort = sortValue => {
        this.setState({selectedValueSort : sortValue, sortOrderBy : sortValue, currentPage : 1})
    }

    handlePageChange = page => {
        this.setState( { currentPage : page })
        document.documentElement.classList.add('on-top');
        setTimeout(() => window.scrollTo(0,0),100);
    }

    handlePreviousPage = () => {
        const previousPage = this.state.currentPage
        if ( previousPage === 1 ) return;
        const pageNow = previousPage - 1;
        this.setState({ currentPage : pageNow });
    }

    handleNextPage = maxPage => {
        const previousPage = this.state.currentPage
        if ( previousPage === maxPage ) return;
        const pageNow = previousPage + 1;
        this.setState({ currentPage : pageNow });
    }

    handleFilter = filterValue => {
        const previousFilterValue = this.state.selectedFilterValue;
        const filterValueEnd =  (filterValue === previousFilterValue) ? null : filterValue
        this.setState({
                        selectedFilterValue : filterValueEnd, 
                        currentPage : 1, 
                        selectedValueSort : "Tên Từ A Đến Z",
                        sortOrderBy : "Tên Từ A Đến Z", 
                    })
    }

    render() { 
        const { album , sortOrderBy, albumPerPage, currentPage, selectedFilterValue } = this.state;
        const filteredAlbum = addfunc.productFilter( album, selectedFilterValue )
        const totalAlbum = filteredAlbum.length;
        const sortedAlbum = addfunc.productSortBy( filteredAlbum , sortOrderBy);
        const albumDisplay = addfunc.albumDisplay( totalAlbum, currentPage, albumPerPage, sortedAlbum )

        return ( 
            <main className="product-section">
                <PreviewModal   isOpeningModal = {this.state.isOpeningModal} 
                                previewId = {this.state.previewId}
                                onClose={this.handleClose}
                                inPreView = {this.state.inPreView}
                                updateShoppingCart={this.props.updateShoppingCart}
                />
                <BreadCrumb titleParent="Sản Phẩm"/>
                <div className="product-section-container d-flex justify-content-between">
                    <section className="filter-part">
                        <h3 className="filter-part-title">Bộ Lọc</h3>
                        <FilterContent 
                            filterList ={this.state.vietnameseFilter} 
                            filterValue = {selectedFilterValue}
                            onFilter={this.handleFilter}
                        />
                        <FilterContent 
                            filterList ={this.state.internationalFilter} 
                            filterValue = {selectedFilterValue}
                            onFilter={this.handleFilter}
                        />
                    </section>
                    <section className="product-part">
                        <div className="product-part-sort">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                    <span>Sắp xếp theo</span><strong>{this.state.selectedValueSort}</strong>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => this.handleSort("Tên Từ A Đến Z")}>Tên Từ A Đến Z</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleSort("Tên Từ Z Đến A")}>Tên Từ Z Đến A</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleSort("Giá Tăng Dần")}>Giá Tăng Dần</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleSort("Giá Giảm Dần")}>Giá Giảm Dần</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="product-part-container">
                            {albumDisplay.map( album => <AlbumItem {...album} key={album.id} onOpen = {this.handleOpening}/>  ) }
                        </div>
                        <PaginationBasic 
                        totalAlbum={totalAlbum}
                        currentPage={currentPage}
                        albumPerPage ={albumPerPage}
                        onPageChange = {this.handlePageChange}
                        onPreviousPage = {this.handlePreviousPage}
                        onNextPage = {this.handleNextPage}
                        />
                    </section>
                </div>
                
            </main>
         );
    }
}

export default Product;