import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import React, { createElement } from 'react';
import { Link } from 'react-router-dom';
import { profileActionCreators } from '../../../redux/reducers/profileReducer/profileReducer';
import { PostType } from '../../../types/types';
import { useAppDispatch } from '../../../utils/hooks/reduxHooks';
import UserAvatar from '../../common/UserAvatar/UserAvatar';

const Post: React.FC<PostType> = ({
  message,
  likesCount,
  id,
  isLiked,
  avatarImage,
  userName,
  userId,
}) => {
  const dispatch = useAppDispatch();

  const like = () => {
    if (isLiked) {
      dispatch(profileActionCreators.removeLike(id));
    } else {
      dispatch(profileActionCreators.addLike(id));
    }
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(isLiked ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likesCount}</span>
      </span>
    </Tooltip>,
  ];

  return (
    <Comment
      actions={actions}
      author={<Link to={'/' + userId}>{userName}</Link>}
      avatar={<UserAvatar src={avatarImage} alt="Users avatar" />}
      content={<p>{message}</p>}
      datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default Post;
