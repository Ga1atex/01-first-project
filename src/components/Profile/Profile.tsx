import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useRedirect } from '../../hoc/useRedirect';
import { getProfileStatus, getUserProfile } from '../../redux/profileReducer';
import { selectAuthorizedUserId, selectProfile, selectProfileUpdateStatus, selectStatus } from '../../redux/profileSelectors';
import PostsContainer from './Posts/PostsContainer';
import UserProfile from './UserProfile/UserProfile';

const Profile: React.FC = (props) => {
  const profile = useSelector(selectProfile)
  const authorizedUserId = useSelector(selectAuthorizedUserId)
  const status = useSelector(selectStatus)
  const profileUpdateStatus = useSelector(selectProfileUpdateStatus)
  const dispatch = useDispatch()
  const params = useParams();

  const userId = Number(params.userId) || authorizedUserId
  useRedirect();

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
      dispatch(getProfileStatus(userId));
    } else {
      console.error('ID should exist un URI params or in state')
    }
  }, [userId])

  return (
    <div className="page__profile profile">
      {/* userId={userId} */}
      <UserProfile isOwner={!params.userId} profile={profile} status={status} profileUpdateStatus={profileUpdateStatus}/>
      <PostsContainer />
    </div>
  );
}

export default Profile;
