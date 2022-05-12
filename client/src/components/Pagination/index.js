import React from 'react';
import ReactPaginate from 'react-paginate';

import './index.css'


function Pagination({ itemsPerPage, totalItemsCount, onPageClick }) {

  const pageCount = Math.ceil(totalItemsCount / itemsPerPage)

  const handlePageClick = (event) => {
    onPageClick(event.selected)
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName={"paginationBtns"}
        previousLinkClassName={"previousBtn"}
        nextLinkClassName={"nextBtn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </>
  );
}

export default Pagination