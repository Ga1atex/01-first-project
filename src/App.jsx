import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import ProfilePage from './components/ProfilePage';

import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <main className='page'>
        <div className='page__container'>
          <Sidebar />
          <ProfilePage />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
