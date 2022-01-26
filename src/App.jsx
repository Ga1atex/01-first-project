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
import DialogsContainer from "./components/Dialogs/DialogsContainer";

function App(props) {
  return (
    <BrowserRouter>
      <Header />
      <main className='page'>
        <div className='page__container'>
          <Sidebar state={props.state.sidebar}/>
          <div className="page__content-wrapper">
            <Routes>
              {/* <Route path="profile" element={<Profile
                profilePage={props.state.profilePage} dispatch={props.dispatch}/>} /> */}
              <Route path="profile" element={<Profile
                store={props.store} />} />
              <Route path="dialogs" element={<DialogsContainer store={props.store} />} />
              {/* <Route path="dialogs" element={<Dialogs dispatch={props.dispatch}
                dialogsPage={props.state.dialogsPage}/>} /> */}
            </Routes>
          </div>
        </div>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
