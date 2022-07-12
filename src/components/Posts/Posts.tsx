import { FormikHelpers } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthorizedUserId, selectFullName, selectPhotoSmall } from '../../redux/reducers/authReducer/authSelectors';
import { PostType } from '../../types/types';
import AddMessageForm, { AddMessageFormPropsType } from '../AddMessageForm/AddMessageForm';
import Post from './Post/Post';

export type MapStateToPropsType = {
  postsData: Array<PostType>,
  userId: string | undefined
}

export type DispatchPropsType = {
  addPost: (newPostValue: string, newPostAvatar: string | null, newPostUserName: string, userId: number) => void
}

const Posts: React.FC<MapStateToPropsType & DispatchPropsType> = (props) => {
  const { postsData, addPost, userId } = props;
  const isOwner = !userId;
  const dispatch = useDispatch()
  const avatar = useSelector(selectPhotoSmall)
  const userName = useSelector(selectFullName)
  const authUserId = useSelector(selectAuthorizedUserId)
  const currentUserId = userId || authUserId;

  const addPostHandler = (values: AddMessageFormPropsType, helpers: FormikHelpers<AddMessageFormPropsType>) => {
    const { setSubmitting, resetForm } = helpers;
    dispatch(addPost(values.message, avatar, userName!, authUserId!));
    setSubmitting(false)
    resetForm()
  };

  const filteredElements = postsData.filter(post => post.userId === currentUserId)

  const postsElements = filteredElements.length
    ? filteredElements.map(post => {
      return <Post key={post.id} {...post} />;
    })
    : <div>There are no posts</div>

  return (
    <section className="profile__posts posts">
      <h2 className="posts__title">Posts</h2>
      {isOwner && <AddMessageForm onSubmit={addPostHandler} />}
      {postsElements}
    </section>
  );
}

export default Posts;
