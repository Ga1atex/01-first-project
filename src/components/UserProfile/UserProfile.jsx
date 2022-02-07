import Preloader from "../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";

export default function UserProfile(props) {
  if (!props.profile) {
    return <Preloader />
  }

  return (
      <div className="profile__info user-info">
        <img src={props.profile.photos.large} alt="" />
      <h3 className="user-info__name">{props.profile.fullName}</h3>
        <div className="user-info__description">
          <ProfileStatus status={"Hello my world"}/>
          {/* <p className="user-info__birthday">1.1.1990</p>
          <p className="user-info__location">Moscow</p>
          <p className="user-info__education">KubSu</p> */}
          <a href="/" className="user-info__website">localhost</a>
        </div>
      </div>
  )
}
