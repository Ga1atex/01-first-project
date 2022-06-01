import React, { MouseEventHandler, useEffect, useState } from 'react';
// import './Pagination.scss';
import styles from './Pagination.module.scss'
import { PaginationItem } from './PaginationItem';

type PaginationPropsType = {
  totalItemsCount: number
  pageSize: number
  portionSize?: number
  onPageChanged?: (pageNumber: number) => void
  currentPage?: number
  isFetching: boolean
}

const Pagination: React.FC<PaginationPropsType> = ({ totalItemsCount, pageSize, portionSize = 10, onPageChanged = () => { }, currentPage = 1, isFetching }) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);

  const pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(Math.floor(currentPage / portionSize) + 1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  const decreasePortionNumber: MouseEventHandler<HTMLButtonElement> = (e) => {
    setPortionNumber(prev => prev - 1);
  }
  const increasePortionNumber: MouseEventHandler<HTMLButtonElement> = (e) => {
    setPortionNumber(prev => prev + 1);
  }

  useEffect(() => setPortionNumber(Math.ceil(currentPage / portionSize)), [currentPage, portionSize]);

  // if (isFetching) {
  //   return null
  // }
  return (
    <div className={styles.pagging}>
      <ul className={styles.pagging__list}>
        <li className={styles.pagging__item}>
          <button disabled={!(portionNumber > 1)} className={styles.pagging__link + ' ' + styles.pagging__arrow} type="button" onClick={decreasePortionNumber}>←</button>
        </li>
        {pagesCount > 1 && pages
          .filter(pageNumber => (leftPortionPageNumber <= pageNumber && pageNumber <= rightPortionPageNumber))
          .map(pageNumber => {
            return (<PaginationItem key={pageNumber}
              pageNumber={pageNumber}
              currentPage={currentPage}
              onPageChanged={onPageChanged}
            />)
          })}
        <li className={styles.pagging__item}>
          <button disabled={!(portionCount > portionNumber)} type="button" className={styles.pagging__link + ' ' + styles.pagging__arrow} onClick={increasePortionNumber}>→</button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
