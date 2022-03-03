import React from 'react';
import { useSelector } from 'react-redux';
import { getIsFetching } from '../../redux/usersSelectors';
import Preloader from '../common/Preloader/Preloader';
import { Users }  from './Users';

type PropsType = {
  pageTitle: string
}

const UsersContainer: React.FC<PropsType> = (props) => {
  const isFetching = useSelector(getIsFetching)
    return (<>
    <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>);
}

export default UsersContainer;
