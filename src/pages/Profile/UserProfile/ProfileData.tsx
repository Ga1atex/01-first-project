import { Button, Space } from 'antd';
import { ContactsType, ProfileType } from '../../../types/types';
import Contact from './Contact';

type ProfileDataPropsType = {
  profile: ProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
};
export const ProfileData: React.FC<ProfileDataPropsType> = (props) => {
  const { isOwner, goToEditMode, profile } = props;

  return (
    <div className="user-info__description">
      {isOwner && <Button onClick={goToEditMode}>Edit Profile</Button>}
      <div className="">
        <h3 className="user-info__name">Full name: {profile.fullName}</h3>
        <p className="user-info__job">
          Looking for a job: {profile.lookingForAJob ? 'Yes' : 'No'}{' '}
        </p>
        {profile.lookingForAJob && (
          <p className="user-info__job-description">
            My professional skills: {profile.lookingForAJobDescription}
          </p>
        )}
        <p className="user-info__job">
          About me: {profile.aboutMe || 'No Info'}{' '}
        </p>
      </div>
      <div className="user-info__contacts">
        <h3 className="user-info__contacts-title">Contacts:</h3>
        <Space size="small" direction="vertical">
          {Object.keys(profile.contacts).map((item) => {
            return (
              <Contact
                key={item}
                contactTitle={item}
                contactValue={profile.contacts[item as keyof ContactsType]}
              />
            );
          })}
        </Space>
      </div>
    </div>
  );
};
