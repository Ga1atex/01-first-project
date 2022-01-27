import Post from './Post/Post';
import React from 'react';

export default function Posts(props) {
  const postsElements = props.postsData.map(post => {
    return <Post message={post.message} key={post.id} id={post.id} likesCount={post.likesCount} />;
  });

  const newPostElement = React.createRef();

  const addPost = () => {
    const text = newPostElement.current.value;
    if (text) {
      props.addPost(text);
    }
  };

  const updateNewPostText = (event) => {
    // const text = newPostElement.current.value;
    const text = event.target.value;
    props.updateNewPostText(text);
  };

  return (
    <section className="profile__posts posts">
      <h2 className="posts__title">My Posts</h2>
      <div className="posts__new-post">
        <textarea className="posts__textarea" name="" id="" cols="30" rows="10" value={props.newPostText} ref={newPostElement} onChange={updateNewPostText} placeholder='Your news...'></textarea>
        <button className="posts__btn" type="button" onClick={addPost}>Send</button>
      </div>
      {postsElements}
    </section>
  );
}
