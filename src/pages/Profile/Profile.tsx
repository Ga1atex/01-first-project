import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useRedirect } from '../../utils/hooks/useRedirect';
import { getProfileStatus, getUserProfile } from '../../redux/reducers/profileReducer/profileReducer';
import { selectProfile, selectProfileIsFetching, selectProfileUpdateStatus, selectStatus } from '../../redux/reducers/profileReducer/profileSelectors';
import PostsContainer from '../../components/Posts/PostsContainer';
import UserProfile from './UserProfile/UserProfile';
import Preloader from '../../components/common/Preloader/Preloader';
import styles from './Profile.module.scss'
import { selectAuthorizedUserId } from '../../redux/reducers/authReducer/authSelectors';

const Profile: React.FC = () => {
  useRedirect();
  const profile = useSelector(selectProfile)
  const authorizedUserId = useSelector(selectAuthorizedUserId)
  const isFetching = useSelector(selectProfileIsFetching)
  const status = useSelector(selectStatus)
  const profileUpdateStatus = useSelector(selectProfileUpdateStatus)
  const dispatch = useDispatch()
  const params = useParams();

  const userId = Number(params.userId) || authorizedUserId;

  useEffect(() => {
    if (userId && userId !== profile?.userId) {
      dispatch(getUserProfile(userId));
      dispatch(getProfileStatus(userId));
    }
  }, [userId, dispatch, profile])

  if (isFetching) {
    return <Preloader />
  }

  return (
    <div className={styles.profile}>
      <UserProfile isOwner={!params.userId} profile={profile} status={status} profileUpdateStatus={profileUpdateStatus} userId={userId} />
      <PostsContainer isOwner={!params.userId} />
    </div>
  );
}

export default Profile;
