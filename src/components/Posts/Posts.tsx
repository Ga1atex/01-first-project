import { FormikHelpers } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthorizedUserId,
  selectFullName,
  selectPhotoSmall,
} from '../../redux/reducers/authReducer/authSelectors';
import { PostType } from '../../types/types';
import AddMessageForm, {
  AddMessageFormPropsType,
} from '../AddMessageForm/AddMessageForm';
import Post from './Post/Post';

type PropsType = {
  postsData: Array<PostType>;
  userId: number | null;
  addPost: Function;
};

const Posts: React.FC<PropsType> = (props) => {
  const { postsData, addPost, userId } = props;
  const dispatch = useDispatch();
  const avatar = useSelector(selectPhotoSmall);
  const userName = useSelector(selectFullName);
  const authUserId = useSelector(selectAuthorizedUserId);
  const isOwner = userId === authUserId;

  const addPostHandler = (
    values: AddMessageFormPropsType,
    helpers: FormikHelpers<AddMessageFormPropsType>
  ) => {
    const { setSubmitting, resetForm } = helpers;
    dispatch(
      addPost({
        message: values.message,
        avatarImage: avatar,
        userName,
        userId: authUserId,
      })
    );
    setSubmitting(false);
    resetForm();
  };

  const filteredElements = postsData.filter((post) => post.userId === userId);

  const postsElements = filteredElements.length ? (
    filteredElements.map((post) => {
      return <Post key={post.id} {...post} />;
    })
  ) : (
    <div>There are no posts</div>
  );

  return (
    <section className="profile__posts posts">
      <h2 className="posts__title">Posts</h2>
      {isOwner && <AddMessageForm onSubmit={addPostHandler} />}
      {postsElements}
    </section>
  );
};

export default Posts;
