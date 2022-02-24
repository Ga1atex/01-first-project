import React, { Suspense } from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Preloader from './components/common/Preloader/Preloader';
import Footer from './components/Footer/Footer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import { initializeApp } from './redux/appReducer';
import store, { AppStateType } from './redux/redux-store';

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
  initializeApp: () => void
}

class App extends React.Component<MapStateToPropsType & MapDispatchPropsType> {
  catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
    alert(promiseRejectionEvent.reason + " in " + promiseRejectionEvent.target);
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

const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized
  };
};

const AppContainer = connect(mapStateToProps, {
  initializeApp
})(App);

const SocialNetworkApp: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default SocialNetworkApp;
