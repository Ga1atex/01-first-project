import { useSelector } from 'react-redux';
import { profileActionCreators } from "../../redux/reducers/profileReducer/profileActions";
import { selectPostsData } from '../../redux/reducers/profileReducer/profileSelectors';
import Posts from './Posts';

type PropsType = {
  userId: string | undefined
}

const PostsContainer: React.FC<PropsType> = ({ userId }) => {
  const postsData = useSelector(selectPostsData)

  return (
    <Posts postsData={postsData} addPost={profileActionCreators.addPost} userId={userId} />
  )
}

export default PostsContainer;
