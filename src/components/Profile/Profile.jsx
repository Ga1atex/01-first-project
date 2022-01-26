import Posts from '../Posts/Posts';
import UserProfile from '../UserProfile/UserProfile';

export default function Profile(props) {
  return (
    <div className="page__profile profile">
      <div className=""><img src="" alt="" /></div>
      <UserProfile />
      <Posts postsData={props.profilePage.postsData} dispatch={props.dispatch} newPostText={props.profilePage.textAreaText}/>
    </div>
  );
}
