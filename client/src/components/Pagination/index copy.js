import React from 'react';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import './index.css'

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

function PaginatedItems({ itemsPerPage, totalItemsCount, onPageClick }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  //const [pageCount, setPageCount] = useState(100);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  //const [itemOffset, setItemOffset] = useState(0);

  const pageCount = Math.ceil(totalItemsCount / itemsPerPage)
  // useEffect(() => {
  //   // Fetch items from another resources.

  //   const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  //   // setCurrentItems(items.slice(itemOffset, endOffset));
  //   setPageCount(Math.ceil(totalItemsCount / itemsPerPage));
  // }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    // const newOffset = (event.selected * itemsPerPage) % totalItemsCount;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    // //setItemOffset(newOffset);
    console.log(`event.selected ${event.selected}`)
    onPageClick(event.selected)
  };

  return (
    <>
      {/* 
    <Items currentItems={currentItems} />
    <p>1 to 5 of 30</p>
    */}


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

export default PaginatedItems