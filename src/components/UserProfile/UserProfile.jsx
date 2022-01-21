export default function UserProfile() {
  return (
      <div className="profile__info user-info">
        <h3 className="user-info__name">Ya Ti</h3>
        <div className="user-info__description">
          <p className="user-info__birthday">1.1.1990</p>
          <p className="user-info__location">Moscow</p>
          <p className="user-info__education">KubSu</p>
          <a href="/" className="user-info__website">localhost</a>
        </div>
      </div>
  )
}
