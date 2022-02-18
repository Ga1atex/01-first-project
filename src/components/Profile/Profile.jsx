import PostsContainer from './Posts/PostsContainer';
import UserProfile from './UserProfile/UserProfile';

export default function Profile(props) {
  return (
    <div className="page__profile profile">
      <UserProfile {...props}/>
      {/* <UserProfile savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} userId={props.userId} status={props.status} saveProfile={props.saveProfile} profileUpdateStatus={props.profileUpdateStatus}/> */}
      <PostsContainer/>
    </div>
  );
}
