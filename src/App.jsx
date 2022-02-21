import {
  Routes,
  Route,
  BrowserRouter,
  Navigate
} from 'react-router-dom';
import './App.css';
import React from 'react';
import { initializeApp } from './redux/appReducer';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import { Provider } from 'react-redux';
import store from './redux/redux-store';
import Footer from './components/Footer/Footer';
import HeaderContainer from './components/Header/HeaderContainer';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import LoginPage from './components/Login/Login';
import { Suspense } from 'react';

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    alert(promiseRejectionEvent.reason, promiseRejectionEvent.target);
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <>
        <HeaderContainer />
        <main className='page'>
          <div className='page__container'>
            <SidebarContainer />
            <div className='page__content-wrapper'>
              <Suspense fallback={<Preloader />}>
                <Routes>
                  <Route path='' element={<Navigate to="profile" />}/>
                  <Route path='profile' element={<ProfileContainer />}>
                    <Route path=':userId' element={<ProfileContainer />} />
                  </Route>
                  <Route path='dialogs' element={<DialogsContainer />} />
                  <Route path='users' element={<UsersContainer pageTitle={'All users'}/>} />
                  <Route path='login' element={<LoginPage />} />
                  <Route path='*' element={<div>404 Not Found</div>} />
                </Routes>
              </Suspense>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  };
};

const AppContainer = connect(mapStateToProps, {
  initializeApp
})(App);

const SocialNetworkApp = (props) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default SocialNetworkApp;
