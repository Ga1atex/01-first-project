import { NavLink } from 'react-router-dom';
// @ts-ignore
import logo from '../../assets/images/logo.svg';
// @ts-ignore
import styles from './Header.module.css';
// @ts-ignore
import propsPhoto from '../../assets/images/user.png';

type PropsType = {
    isAuth: boolean,
    login: null | string
    fullName: null | string
    photoSmall: null | string
    logout: () => void
}

export default function Header(props: PropsType) {
  return (
    <header className={styles.header + " active"}>
      <div className={styles.headerContainer + " container"}>
        <div className={styles.logo}><a className={styles.logoLink} href="">
          <img src={logo} className="App-logo" alt="logo" width="30px" height="30px" />
          Social Network
        </a></div>

        <div className={styles.loginBlock}>
          {props.isAuth
            ? (<>
              <img src={props.photoSmall != null ? props.photoSmall : propsPhoto} alt={"Your avatar image"} width={60} height={60} />
              <p>{props.fullName}</p>
              <button onClick={props.logout}>Log out</button>
            </>)
            : <NavLink to={'/login'}>Login</NavLink>
          }

        </div>
      </div>
    </header>
  );
}
