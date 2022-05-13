import { FormikHelpers } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import AddMessageForm, { AddMessageFormPropsType } from '../AddMessageForm/AddMessageForm';
import { PostType } from '../../types/types';
import Post from './Post/Post';

export type MapStateToPropsType = {
  postsData: Array<PostType>,
  isOwner: boolean
}

export type DispatchPropsType = {
  addPost: (newPostValue: string) => void
}

const Posts: React.FC<MapStateToPropsType & DispatchPropsType> = (props) => {
  const { postsData, addPost, isOwner } = props;
  const dispatch = useDispatch()

  const addPostHandler = (values: AddMessageFormPropsType, helpers: FormikHelpers<AddMessageFormPropsType>) => {
    const { setSubmitting, resetForm } = helpers;

    dispatch(addPost(values.message));
    setSubmitting(false)
    resetForm()
  };

  const postsElements = postsData.length ? postsData.map(post => {
    // const { message, likesCount, id, isLiked } = post;
    // return <Post message={message} id={id} key={id} likesCount={likesCount} isLiked={isLiked} />
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
