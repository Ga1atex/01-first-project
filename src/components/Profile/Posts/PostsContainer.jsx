import { addPost} from '../../../redux/profileReducer';
import Posts from './Posts';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData
  }
}

const PostsContainer = connect(mapStateToProps,{
  addPost
})(Posts);

export default PostsContainer;
