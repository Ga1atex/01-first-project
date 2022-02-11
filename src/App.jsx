import {
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import HeaderContainer from './components/Header/HeaderContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import UsersContainer from './components/Users/UsersContainer';
import LoginPage from './components/Login/Login';
import React from 'react';
import { initializeApp } from './redux/appReducer';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';

class App extends React.Component {
  componentDidMount() {
    // this.props.toggleIsFetching(true);
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <>
        <HeaderContainer />
        <main className='page'>
          <div className='page__container'>
            <SidebarContainer />
            <div className='page__content-wrapper'>
              <Routes>
                <Route path='profile' element={<ProfileContainer />}>
                  <Route path=':userId' element={<ProfileContainer />} />
                </Route>
                <Route path='dialogs' element={<DialogsContainer />} />
                <Route path='users' element={<UsersContainer />} />
                <Route path='login' element={<LoginPage />} />
              </Routes>
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
  }
}

export default connect(mapStateToProps, {
    initializeApp
  })(App);
