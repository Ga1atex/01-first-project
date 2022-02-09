import Post from './Post/Post';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Textarea } from '../common/FormsControls/FormsControls';

const maxLength20 = maxLengthCreator(20);

const Posts = (props) => {
  const postsElements = props.postsData.map(post => {
    return <Post message={post.message} key={post.id} id={post.id} likesCount={post.likesCount} />;
  });

  const addPost = (values) => {
    props.addPost(values.newPostValue);
  };

  return (
    <section className="profile__posts posts">
      <h2 className="posts__title">My Posts</h2>
      <AddNewPostFormRedux onSubmit={addPost}/>
      {postsElements}
    </section>
  );
}

let AddNewPostForm = (props) => {
  return (
    <form className="posts__new-post" onSubmit={props.handleSubmit}>
      <Field className="posts__textarea" cols="30" rows="10" placeholder='Your news...'
        name="newPostValue"
        component={Textarea}
        validate={[required, maxLength20]}/>
      <button className="posts__btn" type="submit">Send</button>
    </form>
  )
}

let AddNewPostFormRedux = reduxForm({
  form: "addNewPostForm"
})(AddNewPostForm)

export default Posts;
