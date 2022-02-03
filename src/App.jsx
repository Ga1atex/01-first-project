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

function App(props) {
  return (
    <>
      <HeaderContainer />
      <main className='page'>
        <div className='page__container'>
          <SidebarContainer />
          <div className='page__content-wrapper'>
            <Routes>
              <Route path='profile' element={<ProfileContainer />}>
                <Route path=':userId' element={<ProfileContainer />}/>
              </Route>
              <Route path='dialogs' element={<DialogsContainer />} />
              <Route path='users' element={<UsersContainer />} />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
