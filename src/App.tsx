import { Breadcrumb, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import React, { Suspense, useEffect } from 'react';
import { connect, Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Breadcrumbs } from './components/common/Breadcrumbs/Breadcrumbs';
import Preloader from './components/common/Preloader/Preloader';
import FooterComponent from './components/Footer/Footer';
import AppHeader from './components/Header/Header';
// import Footer from './components/Footer/Footer';
import LoginPage from './components/Login/Login';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import { initializeApp } from './redux/appReducer';
import store, { AppStateType } from './redux/redux-store';

const { Content, Footer } = Layout;

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));
const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'));
const ChatPage = React.lazy(() => import('./pages/chat/ChatPage'));


const App:React.FC = () => {
  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  const dispatch = useDispatch()

  const catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
    alert(promiseRejectionEvent.reason + " in " + promiseRejectionEvent.target);
  }
  useEffect(() => {
    dispatch(initializeApp());
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors);

    return () => {
      window.removeEventListener("unhandledrejection", catchAllUnhandledErrors);
    }
  })
    if (!initialized) {
      return <Preloader />;
    }

    return (
      <Layout >
        <AppHeader />
        <Content className='container'>
          <Breadcrumbs />
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <SidebarContainer/>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Suspense fallback={<Preloader />}>
                <Routes>
                  <Route path='' element={<Navigate to="profile" />} />
                  <Route path='profile' element={<Profile />}>
                    <Route path=':userId' element={<Profile />} />
                  </Route>
                  <Route path='dialogs' element={<Dialogs />} />
                  <Route path='users' element={<UsersContainer pageTitle={'All users'} />} />
                  <Route path='login' element={<LoginPage />} />
                  <Route path='chat' element={<ChatPage />} />
                  <Route path='*' element={<div>404 Not Found</div>} />
                </Routes>
              </Suspense></Content>
          </Layout>
        </Content>
        <FooterComponent/>
      </Layout>
    );
}

const SocialNetworkApp: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};

export default SocialNetworkApp;
