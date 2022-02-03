import { addPost, updateText } from '../../redux/profileReducer';
import Posts from './Posts';
import {connect} from 'react-redux';

// export default function PostsContainer(props) {
//   return (
//     <StoreContext.Consumer>
//       { (store) => {
//         const addPost = (text) => {
//           const action = addPostActionCreator(text);
//           store.dispatch(action);
//         };

//         const updateNewPostText = (text) => {
//           const action = updateTextActionCreator(text);
//           store.dispatch(action);
//         };
//         return <Posts updateNewPostText={updateNewPostText} addPost={addPost} postsData={state.postsData} newPostText={state.textAreaText} />;
//       }
//     }
//     </StoreContext.Consumer>
//   );
// }

const mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.textAreaText
  }
}


// const mapDispatchToProps = (dispatch) => {
//   return {
//     addPost(text) {
//       const action = addPost(text);
//       dispatch(action)
//     },
//     updateNewPostText(text) {
//       const action = updateText(text);
//       dispatch(action)
//     }
//   };
// }
const PostsContainer = connect(mapStateToProps,{
  addPost,
  updateNewPostText: updateText
})(Posts);

export default PostsContainer;
