import React from 'react';
import './Pagination.css';

const Pagination = (props) => {
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    if (pages.length < 10) {
      pages.push(i);
    }
  }

  return (
      <div className="pagging">
        {/* <a href="" className="pagging__arrow"></a> */}
        <ul className="pagging__list">
          {pages.map(p => {
            return <li className="pagging__item" key={p}><a className={"pagging__link" + (props.currentPage === p ? " pagging__link--active" : '')} onClick={(e) => { props.onPageChanged(p); }}>{p}</a></li>;
          })}
        </ul>
        {/* <a href="" className="pagging__arrow"></a>  */}
      </div>
  );
};

export default Pagination;
