import Posts from './Posts';
import UserProfile from './UserProfile';

export default function ProfilePage() {
  return (
    <div className="page__profile profile">
      <div className=""><img src="" alt="" /></div>
      <UserProfile />
      <Posts />
    </div>
  );
}
