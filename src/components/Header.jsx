import logo from '../img/logo.svg';

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
      <img src={logo} className="App-logo" alt="logo" width="20px" height="20px"/>
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
