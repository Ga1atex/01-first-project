import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import styles from './Header.module.css';
import propsPhoto from '../../assets/images/user.png';


export default function Header(props) {
  return (
    <header className={styles.header + " active"}>
      <div className={styles.headerContainer + " container"}>
        <a className={styles.logo} href="">
          <img src={logo} className="App-logo" alt="logo" width="30px" height="30px" />
          Social Network
        </a>
        <div className={styles.loginBlock}>
          {props.isAuth ? (<>
            <img src={props.photoSmall != null ? props.photoSmall : propsPhoto} alt={"Your avatar image"} width={60} height={60} /><p>{props.fullName}</p></> )
            : <NavLink to={'/login'}>Login</NavLink>
          }

        </div>
      </div>
    </header>
  );
}
