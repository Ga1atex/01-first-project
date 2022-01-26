import { NavLink } from "react-router-dom";
import styles from './Sidebar.module.css';

export default function Sidebar(props) {
  const friendsList = props.state.friendsData.map((friend => <li className={styles.friendsItem}>
    <a className={styles.friendsImg} href=""><img src="" alt={friend.firstName + "'s avatar"} width="60" height="60" /></a>
    <span className={styles.friendsFirstName}>{friend.firstName}</span>
  </li>));

  return (
    <aside className={styles.sidebar}>
      <nav className='sidebar__menu menu'>
        <ul className='menu__list'>
          <li className={styles.menuItem}><NavLink to="/profile" className={(navData) => (navData.isActive ? styles.active : '')}>Profile</NavLink></li>
          <li className={styles.menuItem}><NavLink to="/dialogs" className={(navData) => (navData.isActive ? styles.active : '')}>Messages</NavLink></li>
          <li className={styles.menuItem}><NavLink to="/feed" className={(navData) => (navData.isActive ? styles.active : '')}>News</NavLink></li>
          <li className={styles.menuItem}><NavLink to="/audios" className={(navData) => (navData.isActive ? styles.active : '')}>Music</NavLink></li>
          <li className={styles.menuItem}><NavLink to="/settings" className={(navData) => (navData.isActive ? styles.active : '')}>Settings</NavLink></li>
          <li className={styles.menuItem}><NavLink to="/friends" className={(navData) => (navData.isActive ? styles.active : '')}>Friends</NavLink>
            <ul className={styles.friends}>
              {friendsList}
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
