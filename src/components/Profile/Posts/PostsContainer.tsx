import { actionCreators} from '../../../redux/profileReducer';
import Posts, { DispatchPropsType, MapStateToPropsType } from './Posts';
import {connect} from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';

const mapStateToProps = (state: AppStateType) => {
  return {
    postsData: state.profilePage.postsData
  }
}


const PostsContainer = connect<MapStateToPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps,{
  addPost: actionCreators.addPost
})(Posts);

export default PostsContainer;
