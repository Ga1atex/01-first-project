import { FormikHelpers } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import AddMessageForm, { AddMessageFormPropsType } from '../../../components/AddMessageForm/AddMessageForm';
import { PostType } from '../../../types/types';
import Post from './Post/Post';

export type MapStateToPropsType = {
  postsData: Array<PostType>
}

export type DispatchPropsType = {
  addPost: (newPostValue: string) => void
}

const Posts: React.FC<MapStateToPropsType & DispatchPropsType> = (props) => {
  const { postsData, addPost } = props;
  const dispatch = useDispatch()
  const postsElements = postsData.map(post => {
    const { message, likesCount, id } = post;
    return <Post message={message} key={id} id={id} likesCount={likesCount} />;
  });

  const addPostHandler = (values: AddMessageFormPropsType, helpers: FormikHelpers<AddMessageFormPropsType>) => {
    const { setSubmitting, resetForm } = helpers;
    if (!values.newMessageValue) {
      return
    }
    dispatch(addPost(values.newMessageValue));
    setSubmitting(false)
    resetForm()
  };

  return (
    <section className="profile__posts posts">
      <h2 className="posts__title">My Posts</h2>
      <AddMessageForm onSubmit={addPostHandler} />
      {postsElements}
    </section>
  );
}

export default Posts;
