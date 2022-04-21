import { useSelector } from 'react-redux';
import { actionCreators } from '../../../redux/reducers/profileReducer/profileReducer';
import { selectPostsData } from '../../../redux/reducers/profileReducer/profileSelectors';
import Posts from './Posts';

const PostsContainer = () => {
  const postsData = useSelector(selectPostsData)

  return (
    <Posts postsData={postsData} addPost={actionCreators.addPost} />
  )
}

export default PostsContainer;
