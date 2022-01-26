import Post from './Post/Post'
import React from 'react';
import { addPostActionCreator, updateTextActionCreator } from '../../redux/profileReducer';

export default function Posts(props) {
  const postsElements = props.postsData.map(post => {
    return <Post message={post.message} id={post.id} likesCount={post.likesCount}/>;
  })

  const newPostElement = React.createRef();
  const addPost = () => {
    const text = newPostElement.current.value;

    if (text) {
      // props.addPost(text);
      const action = addPostActionCreator(text)
      props.dispatch(action);
    }
  }
  const updateNewPostText = () => {
    const text = newPostElement.current.value;
    // props.updateNewPostText(text, 'profilePage');
    const action = updateTextActionCreator(text, 'profilePage')
    props.dispatch(action);
  }

  return (
    <section className="profile__posts posts">
      <h2 className="posts__title">My Posts</h2>
      <div className="posts__new-post">
        <textarea className="posts__textarea" name="" id="" cols="30" rows="10" value={props.newPostText} ref={newPostElement} onChange={updateNewPostText} placeholder='Your news...'></textarea>
        <button className="posts__btn" type="button" onClick={addPost}>Send</button>
      </div>
      {postsElements}
    </section>
  )
}
