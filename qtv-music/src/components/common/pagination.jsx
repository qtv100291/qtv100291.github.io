import React from 'react';
import Pagination from 'react-bootstrap/Pagination'
import './pagination.scss'

const PaginationBasic = ({ 
                        totalAlbum, 
                        currentPage, 
                        albumPerPage, 
                        onPageChange, 
                        onPreviousPage, 
                        onNextPage }) => {
    const totalPage = Math.ceil(totalAlbum/albumPerPage);
    const pages = Array.from(new Array(totalPage), (x, i) => i + 1);
    return ( 
        <Pagination className = "d-flex justify-content-center">
            <Pagination.Prev onClick = {onPreviousPage}/>
            {pages.map(page => 
                <Pagination.Item 
                    key={page} 
                    active={page === currentPage}
                    onClick={() => onPageChange (page)}>
                    {page}
              </Pagination.Item>
            )}
            <Pagination.Next onClick={() => onNextPage(totalPage)}/>
        </Pagination>
     );
}
 
export default PaginationBasic;