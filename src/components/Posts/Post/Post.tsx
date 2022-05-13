// import styles from './Post.module.css'
import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Comment, Tooltip } from 'antd';
import moment from 'moment';
import React, { createElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import userPhoto from '../../../assets/images/user.png';
import { actionCreators } from '../../../redux/reducers/profileReducer/profileReducer';
import { PostType } from '../../../types/types';


const Post: React.FC<PostType> = ({ message, likesCount, id, isLiked }) => {
  const dispatch = useDispatch()

  const like = () => {
    if (isLiked) {
      dispatch(actionCreators.removeLike(id))
    } else {
      dispatch(actionCreators.addLike(id))
    }
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(isLiked ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likesCount}</span>
      </span>
    </Tooltip>
  ];

  return (
    <Comment
      actions={actions}
      author={<Link to={''}>You</Link>}
      avatar={<Avatar src={userPhoto} alt="Users avatar" />}
      content={
        <p>
          {message}
        </p>
      }
      datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
}

export default Post;
