import Post from './Post/Post';
import React from 'react';
import AddNewPostForm, {AddPostFormValuesType } from './AddNewPostForm';
import { PostType } from '../../../types/types';

export type MapStateToPropsType ={
  postsData: Array<PostType>
}

export type DispatchPropsType = {
  addPost: (newPostValue: string) => void
}

const Posts: React.FC<MapStateToPropsType & DispatchPropsType> = props => {
  const postsElements = props.postsData.map(post => {
    return <Post message={post.message} key={post.id} id={post.id} likesCount={post.likesCount} />;
  });

  const addPost = (values: any) => {
    props.addPost(values.newPostValue);
  };

  return (
    <section className="profile__posts posts">
      <h2 className="posts__title">My Posts</h2>
      <AddNewPostForm onSubmit={addPost}/>
      {postsElements}
    </section>
  );
}

export default Posts;
