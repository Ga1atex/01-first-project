import { Layout } from 'antd';
import 'antd/dist/antd.min.css';
import React, { Suspense, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Breadcrumbs } from './components/common/Breadcrumbs/Breadcrumbs';
import Preloader from './components/common/Preloader/Preloader';
import FooterComponent from './components/Footer/Footer';
import AppHeader from './components/Header/Header';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import LoginPage from './pages/Login/Login';
import { initializeApp } from './redux/reducers/appReducer/appReducer';
import { selectInitialized } from './redux/reducers/appReducer/appSelectors';
import store from './redux/store';

const { Content } = Layout;

const UsersContainer = React.lazy(() => import('./pages/Users/UsersContainer'));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));
const Dialogs = React.lazy(() => import('./pages/Dialogs/Dialogs'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));

export enum RouteNames {
  PROFILE = 'profile',
  PAGE_USERID = ':userId',
  DIALOGS = 'dialogs',
  USERS = 'users',
  LOGIN = 'login',
  CHAT = 'chat'
}
const App: React.FC = () => {
  const initialized = useSelector(selectInitialized)
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
        <Layout className="site-layout-background" style={{ paddingBottom: '24px' }}>
          <SidebarContainer />
          <Content style={{ padding: '0 12px', minHeight: 280 }}>
            <Suspense fallback={<Preloader />}>
              <Routes>
                {/* <Route path='' element={<Navigate to="profile" />} /> */}
                <Route path='' element={<Profile />} />
                <Route path={RouteNames.PROFILE} element={<Profile />}>
                  <Route path={RouteNames.PAGE_USERID} element={<Profile />} />
                </Route>
                <Route path={RouteNames.DIALOGS} element={<Dialogs />} >
                  <Route path={RouteNames.PAGE_USERID} element={<Dialogs />} />
                </Route>
                <Route path={RouteNames.USERS} element={<UsersContainer pageTitle={'All users'} />} />
                <Route path={RouteNames.LOGIN} element={<LoginPage />} />
                <Route path={RouteNames.CHAT} element={<ChatPage />} />
                <Route path='*' element={<div>404 Not Found</div>} />
              </Routes>
            </Suspense>
          </Content>
        </Layout>
      </Content>
      <FooterComponent />
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
