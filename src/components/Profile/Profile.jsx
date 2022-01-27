import PostsContainer from '../Posts/PostsContainer';
import UserProfile from '../UserProfile/UserProfile';

export default function Profile() {
  return (
    <div className="page__profile profile">
      <div className=""><img src="" alt="" /></div>
      <UserProfile />
      <PostsContainer/>
    </div>
  );
}
