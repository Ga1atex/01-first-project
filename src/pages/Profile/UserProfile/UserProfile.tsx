import { Button, Image, message, Space } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { FormikHelpers } from "formik";
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import userPhoto from '../../../assets/images/user.png';
import FileInput from "../../../components/common/FormsControls/FileInput";
import Preloader from "../../../components/common/Preloader/Preloader";
import { actionCreators, savePhoto, saveProfile } from "../../../redux/reducers/profileReducer/profileReducer";
import { ContactsType, ProfileType } from "../../../types/types";
import { RouteNames } from "../../../utils/redirectRules";
import Contact from "./Contact";
import ProfileDataForm from "./ProfileDataForm";
import ProfileStatusContainer from "./ProfileStatus/ProfileStatusContainer";
import './UserProfile.scss';

type PropsType = {
  isOwner: boolean
  profile: ProfileType | null,
  userId: number | null,
  status: string,
  profileUpdateStatus: string
}

const UserProfile: React.FC<PropsType> = (props) => {
  const { profileUpdateStatus, profile, isOwner, status, userId } = props;

  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch()
  // for the native input:file
  // const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files?.length) {
  //     dispatch(savePhoto(e.target.files[0]));
  //   }
  // };
  // const onMainPhotoSelected = (info: UploadChangeParam<UploadFile<unknown>>) => {
  //   if (info.fileList.length) {
  //     dispatch(savePhoto(info.fileList[0]));
  //   }
  // };
  const onMainPhotoSelected = (options: UploadRequestOption) => {
    dispatch(savePhoto(options.file));
  }

  const onSubmit = (formData: ProfileType, submitProps: FormikHelpers<ProfileType>) => {
    // dispatch(saveProfile(formData, submitProps.setStatus));
    dispatch(saveProfile(formData, submitProps.setErrors));
  };

  useEffect(() => {
    if (profileUpdateStatus === 'success') {
      setEditMode(false);
      dispatch(actionCreators.saveProfileSuccess('none'))
    }
  }, [profileUpdateStatus, dispatch])

  const goToEditMode = () => {
    setEditMode(true);
  }

  if (!profile) {
    return <Preloader />;
  }

  const beforeUpload = (file: UploadFile<unknown>) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt4M = file.size! / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error('Image must smaller than 4MB!');
    }
    return isLt4M && isJpgOrPng;
  }

  return (
    <Space className="profile__info user-info" direction="vertical" size="small">
      <Image className="user-info__avatar" src={profile.photos.large || userPhoto} alt="" width={250} />
      {isOwner && (
        <div>
          <span>Upload photo: </span>
          {/* <input type={"file"} onChange={onMainPhotoSelected} /> */}
          <FileInput customRequest={onMainPhotoSelected} beforeUpload={beforeUpload} name={'avatar'} accept=".png,.jpg,.jpeg" showUploadList={false} />
        </div>)
      }
      {!isOwner &&
        <Button><Link to={`${RouteNames.DIALOGS}/${userId}`}>Start dialog</Link></Button>
      }
      <ProfileStatusContainer status={status} isOwner={isOwner} />
      {editMode
        ? <ProfileDataForm profile={profile} onSubmit={onSubmit} />
        : <ProfileData goToEditMode={goToEditMode} profile={profile} isOwner={isOwner} />}
    </Space>
  );
}
type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = (props) => {
  const { isOwner, goToEditMode, profile } = props;

  return (<div className="user-info__description">
    {isOwner && <Button onClick={goToEditMode}>Edit Profile</Button>}
    <div className="">
      <h3 className="user-info__name">Full name: {profile.fullName}</h3>
      <p className="user-info__job">Looking for a job: {profile.lookingForAJob ? "Yes" : "No"} </p>
      {profile.lookingForAJob && <p className="user-info__job-description">My professional skills: {profile.lookingForAJobDescription}</p>}
      <p className="user-info__job">About me: {profile.aboutMe || 'No Info'} </p>
    </div>
    <div className="user-info__contacts">
      <h3 className="user-info__contacts-title">My contacts:</h3>
      {Object.keys(profile.contacts)
        .map(item => {
          return <Contact key={item} contactTitle={item} contactValue={profile.contacts[item as keyof ContactsType]} />;
        })}
    </div>
  </div>);
};


export default UserProfile
