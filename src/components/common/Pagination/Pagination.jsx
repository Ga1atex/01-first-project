import React, { useEffect, useState } from 'react';
import './Pagination.css';

const Pagination = ({ totalItemsCount, pageSize, portionSize = 10, onPageChanged, currentPage }) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionSize);
  // const [portionNumber, setPortionNumber] = useState(Math.floor(currentPage / 10) + 1)
  const [portionNumber, setPortionNumber] = useState(1)
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  // useEffect(() => setPortionNumber(Math.ceil(currentPage / portionSize)), [currentPage]);

  return (
    <div className="pagging">
      {portionNumber > 1 && <a className="pagging__link pagging__arrow" onClick={() => setPortionNumber(portionNumber-1) }>←</a>}

      <ul className="pagging__list">
        {pages
          .filter(pageNumber => (leftPortionPageNumber <= pageNumber && pageNumber <= rightPortionPageNumber))
          .map(pageNumber => {
            return <li className="pagging__item" key={pageNumber}><a className={"pagging__link" + (currentPage === pageNumber ? " pagging__link--active" : '')} onClick={(e) => { onPageChanged(pageNumber); }}>{pageNumber}</a></li>;
          })}
      </ul>
      {portionCount > portionNumber && <a className="pagging__link pagging__arrow" onClick={() => setPortionNumber(portionNumber+1)}>→</a>}
    </div>
  );
};

export default Pagination;
