import { addPostActionCreator, updateTextActionCreator } from '../../redux/profileReducer';
import Posts from './Posts';

export default function PostsContainer(props) {
  const state = props.store.getState().profilePage;

  const addPost = (text) => {
      const action = addPostActionCreator(text)
      props.store.dispatch(action);
  }

  const updateNewPostText = (text) => {
    const action = updateTextActionCreator(text)
    props.store.dispatch(action);
  }

  return (
    <Posts updateNewPostText={updateNewPostText} addPost={addPost} postsData={state.postsData} newPostText={state.textAreaText}/>
  )
}
