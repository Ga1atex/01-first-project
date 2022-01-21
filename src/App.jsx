import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Sidebar from './components/Sidebar/Sidebar';
import Dialogs from './components/Dialogs/Dialogs';

function App(props) {
  return (
    <BrowserRouter>
      <Header />
      <main className='page'>
        <div className='page__container'>
          <Sidebar />
          <div className="page__content-wrapper">
            <Routes>
              <Route path="profile" element={<Profile postsData={props.postsData}/>} />
              <Route path="dialogs" element={<Dialogs dialogsData={props.dialogsData} messagesData={props.messagesData} />} />
            </Routes>
          </div>
        </div>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
