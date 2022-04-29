import { useSelector } from 'react-redux';
import { actionCreators } from '../../redux/reducers/profileReducer/profileReducer';
import { selectPostsData } from '../../redux/reducers/profileReducer/profileSelectors';
import Posts from './Posts';

type PropsType = {
  isOwner: boolean
}

const PostsContainer: React.FC<PropsType> = ({ isOwner }) => {
  const postsData = useSelector(selectPostsData)

  return (
    <Posts postsData={postsData} addPost={actionCreators.addPost} isOwner={isOwner} />
  )
}

export default PostsContainer;
