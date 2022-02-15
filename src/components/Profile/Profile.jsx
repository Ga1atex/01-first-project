import PostsContainer from './Posts/PostsContainer';
import UserProfile from './UserProfile/UserProfile';

export default function Profile(props) {

  return (
    <div className="page__profile profile">
      <UserProfile profile={props.profile} userId={props.userId}/>
      <PostsContainer/>
    </div>
  );
}
