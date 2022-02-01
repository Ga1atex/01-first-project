import {
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import UsersContainer from './components/Users/UsersContainer';

function App(props) {
  return (
    <>
      <Header />
      <main className='page'>
        <div className='page__container'>
          <SidebarContainer />
          <div className='page__content-wrapper'>
            <Routes>
              <Route path='profile' element={<Profile />} />
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
