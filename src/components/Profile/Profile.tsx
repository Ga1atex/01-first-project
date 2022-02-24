import { ProfileType } from '../../types/types';
import PostsContainer from './Posts/PostsContainer';
import UserProfile from './UserProfile/UserProfile';

type PropsType = {
  savePhoto: (file: File) => void
  isOwner: boolean
  profile: ProfileType | null
  // userId: number
  status: string
  saveProfile: (profile: ProfileType) => void
  profileUpdateStatus: string
}

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div className="page__profile profile">
      {/* <UserProfile {...props} /> */}
      {/* userId={props.userId} */}
      <UserProfile savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} status={props.status} saveProfile={props.saveProfile} profileUpdateStatus={props.profileUpdateStatus}/>
      <PostsContainer />
    </div>
  );
}

export default Profile;
