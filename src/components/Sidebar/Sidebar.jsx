import {  NavLink } from "react-router-dom";
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className='sidebar__menu menu'>
        <ul className='menu__list'>
          <li className={styles.menuItem}><NavLink to="/profile" className={(navData) => (navData.isActive ? styles.active : '')}>Profile</NavLink></li>
          <li className={styles.menuItem}><NavLink to="/dialogs" className={(navData) => (navData.isActive ? styles.active : '')}>Messages</NavLink></li>
          <li className={styles.menuItem}><NavLink to="/feed" className={(navData) => (navData.isActive ? styles.active : '')}>News</NavLink></li>
          <li className={styles.menuItem}><NavLink to="/audios" className={(navData) => (navData.isActive ? styles.active : '')}>Music</NavLink></li>
          <li className={styles.menuItem}><NavLink to="/settings" className={(navData) => (navData.isActive ? styles.active : '')}>Settings</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
}
