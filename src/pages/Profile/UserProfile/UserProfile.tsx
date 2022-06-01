import { Button, Image, message, Space } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { FormikHelpers } from "formik";
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FileInput from "../../../components/common/FormsControls/FileInput";
import Preloader from "../../../components/common/Preloader/Preloader";
import { savePhoto, saveProfile } from "../../../redux/reducers/profileReducer/profileThunks";
import { profileActionCreators } from "../../../redux/reducers/profileReducer/profileActions";
import { ProfileType } from "../../../types/types";
import { RouteNames } from "../../../utils/redirectRules";
import ProfileDataForm from "./ProfileDataForm";
import ProfileStatusContainer from "./ProfileStatus/ProfileStatusContainer";
import './UserProfile.scss';
import { ProfileData } from "./ProfileData";
import { UserOutlined } from '@ant-design/icons';
import UserAvatar from "../../../components/common/UserAvatar/UserAvatar";
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
      dispatch(profileActionCreators.saveProfileSuccess('none'))
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
      {profile.photos.large
        ? <Image className="user-info__avatar" src={profile.photos.large} alt={profile.fullName + '\'s avatar'} width={280} />
        : <UserAvatar size={280} shape='square' />
      }

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

export default UserProfile
