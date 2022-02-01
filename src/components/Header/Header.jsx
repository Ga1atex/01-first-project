import logo from '../../assets/images/logo.svg';
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header + " active"}>
      <div className="header__container">
      <img src={logo} className="App-logo" alt="logo" width="30px" height="30px"/>
      <h1>hello world 456</h1>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      </div>
    </header>
  );
}
