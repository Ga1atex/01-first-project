import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusContainer from "./ProfileStatus/ProfileStatusContainer";
import userPhoto from '../../../assets/images/user.png';
import './UserProfile.css';
import { useState } from "react";
import ProfileDataForm from "./ProfileDataForm";


export default function UserProfile(props) {
  const [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    props.saveProfile(formData);
    if (props.profileUpdateStatus === 'success') {
      setEditMode(false);
    }
    // TODO: need to set profileUpdateStatus = 'none'
  };


  return (
    <div className="profile__info user-info">
      <img className="user-info__avatar" src={props.profile.photos.large || userPhoto} alt="" width={250} height={250} />
      {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
      <ProfileStatusContainer userId={props.userId} status={props.status} isOwner={props.isOwner} />
      {editMode
        ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
        : <ProfileData goToEditMode={() => { setEditMode(true); }} profile={props.profile} isOwner={props.isOwner} />}
    </div>
  );
}

const Contact = ({ contactTitle, contactValue, }) => {
  return <div className="contact__title">
    {contactTitle}: <a href={contactValue} className={"contact__value"}>{contactValue}</a>
  </div>;
};

const ProfileData = (props) => {
  return (<div className="user-info__description">
    {props.isOwner && <button onClick={props.goToEditMode}>Edit</button>}
    <div className="">
      <h3 className="user-info__name">Full name: {props.profile.fullName}</h3>
      <p className="user-info__job">Looking for a job: {props.profile.lookingForAJob ? "Yes" : "No"} </p>
      {props.profile.lookingForAJob && <p className="user-info__job-description">My professional skills: {props.profile.lookingForAJobDescription}</p>}
      <p className="user-info__job">About me: {props.profile.aboutMe} </p>
    </div>
    <div className="user-info__contacts">
      <h3 className="user-info__contacts-title">My contacts:</h3>
      {Object.keys(props.profile.contacts)
        .map(item => {
          return <Contact key={item} contactTitle={item} contactValue={props.profile.contacts[item]} />;
        })}
    </div>
  </div>);
};
