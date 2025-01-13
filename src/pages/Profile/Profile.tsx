import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Preloader from '../../components/common/Preloader/Preloader';
import PostsContainer from '../../components/Posts/PostsContainer';
import { selectAuthorizedUserId } from '../../redux/reducers/authReducer/authSelectors';
import {
  selectProfile,
  selectProfileIsFetching,
  selectProfileUpdateStatus,
  selectStatus,
} from '../../redux/reducers/profileReducer/profileSelectors';
import {
  getProfileStatus,
  getUserProfile,
} from '../../redux/reducers/profileReducer/profileThunks';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import styles from './Profile.module.scss';
import UserProfile from './UserProfile/UserProfile';

const Profile: React.FC = () => {
  const profile = useSelector(selectProfile);
  const authorizedUserId = useSelector(selectAuthorizedUserId);
  const isFetching = useSelector(selectProfileIsFetching);
  const status = useSelector(selectStatus);
  const profileUpdateStatus = useSelector(selectProfileUpdateStatus);
  const dispatch = useAppDispatch();
  const params = useParams();

  const userId = Number(params.userId) || authorizedUserId;

  useEffect(() => {
    if (userId && userId !== profile?.userId) {
      dispatch(getUserProfile(userId));
      dispatch(getProfileStatus(userId));
    }
  }, [userId, dispatch, profile]);

  if (isFetching) {
    return <Preloader />;
  }

  return (
    <div className={styles.profile}>
      <UserProfile
        isOwner={!params.userId || Number(params.userId) === authorizedUserId}
        profile={profile}
        status={status}
        profileUpdateStatus={profileUpdateStatus}
        userId={userId}
      />
      <PostsContainer userId={userId} />
    </div>
  );
};

export default Profile;
