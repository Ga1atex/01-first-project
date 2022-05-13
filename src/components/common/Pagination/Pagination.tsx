import classNames from 'classnames';
import QueryString from 'qs';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { QueryParamsType } from '../../../pages/Users/UsersContainer';
import { RouteNames } from '../../../utils/redirectRules';
import './Pagination.scss';

type PaginationPropsType = {
  totalItemsCount: number
  pageSize: number
  portionSize?: number
  onPageChanged?: (pageNumber: number) => void
  currentPage?: number
  isFetching: boolean
}

type PaginationItemPropsType = {
  pageNumber: number,
  currentPage: number,
  onPageChanged?: (pageNumber: number) => void
}

const PaginationItem: React.FC<PaginationItemPropsType> = ({ pageNumber, currentPage, onPageChanged = () => { } }) => {
  const listItemClass = classNames("pagging__link", { "pagging__link--active": currentPage === pageNumber })
  const urlParams = QueryString.parse(window.location.search.slice(1)) as QueryParamsType

  const clickHandler: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault()
    onPageChanged(pageNumber);
  }

  const link = `${RouteNames.USERS}?${urlParams.term ? `term=${urlParams.term}&` : ''}page=${pageNumber}${urlParams.friend ? `&friend=${urlParams.friend}` : ''}`

  return (
    <li className="pagging__item">
      <Link className={listItemClass} to={link} onClick={clickHandler}>{pageNumber}</Link>
    </li>
  );
}

const Pagination: React.FC<PaginationPropsType> = ({ totalItemsCount, pageSize, portionSize = 10, onPageChanged = () => { }, currentPage = 1, isFetching }) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);

  const pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(Math.floor(currentPage / 10) + 1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  const decreasePortionNumber: MouseEventHandler<HTMLButtonElement> = (e) => {
    setPortionNumber(prev => prev - 1);
  }
  const increasePortionNumber: MouseEventHandler<HTMLButtonElement> = (e) => {
    setPortionNumber(prev => prev + 1);
  }

  useEffect(() => setPortionNumber(Math.ceil(currentPage / portionSize)), [currentPage, portionSize]);

  if (isFetching) {
    return null
  }
  return (
    <div className="pagging">
      <ul className="pagging__list">
        <li className={"pagging__item"}><button disabled={!(portionNumber > 1)} className="pagging__link pagging__arrow" type="button" onClick={decreasePortionNumber}>←</button></li>
        {pagesCount > 1 && pages
          .filter(pageNumber => (leftPortionPageNumber <= pageNumber && pageNumber <= rightPortionPageNumber))
          .map(pageNumber => {
            return (<PaginationItem key={pageNumber} pageNumber={pageNumber} currentPage={currentPage} onPageChanged={onPageChanged} />)
          })}
        <li className={"pagging__item"}><button disabled={!(portionCount > portionNumber)} type="button" className="pagging__link pagging__arrow" onClick={increasePortionNumber}>→</button></li>
      </ul>
    </div>
  );
};

export default Pagination;
