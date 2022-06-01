import { useSelector } from 'react-redux';
import { profileActionCreators } from "../../redux/reducers/profileReducer/profileActions";
import { selectPostsData } from '../../redux/reducers/profileReducer/profileSelectors';
import Posts from './Posts';

type PropsType = {
  isOwner: boolean
}

const PostsContainer: React.FC<PropsType> = ({ isOwner }) => {
  const postsData = useSelector(selectPostsData)

  return (
    <Posts postsData={postsData} addPost={profileActionCreators.addPost} isOwner={isOwner} />
  )
}

export default PostsContainer;
