import classNames from 'classnames';
import QueryString from 'qs';
import React, { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { QueryParamsType } from '../../../pages/Users/UsersContainer';
import { RouteNames } from '../../AppRoutes';
import styles from './Pagination.module.scss';

type PaginationItemPropsType = {
  pageNumber: number;
  currentPage: number;
  onPageChanged?: (pageNumber: number) => void;
};
export const PaginationItem: React.FC<PaginationItemPropsType> = ({ pageNumber, currentPage, onPageChanged = () => { } }) => {
  const isActive = (currentPage === pageNumber);
  const listItemClass = classNames(styles.pagging__link, { [styles['pagging__link--active']]: isActive });
  const urlParams = QueryString.parse(window.location.search.slice(1)) as QueryParamsType;

  const clickHandler: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (isActive) return false
    event.preventDefault();
    onPageChanged(pageNumber);
  };

  const { page: _, ...restParams } = urlParams;
  const link = `${RouteNames.USERS}?page=${pageNumber}${QueryString.stringify(restParams)}`

  return (
    <li className={styles.pagging__item}>
      <Link className={listItemClass} to={link} onClick={clickHandler}>{pageNumber}</Link>
    </li>
  );
};
