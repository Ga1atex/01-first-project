import { LaptopOutlined, MessageOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import React, { Suspense } from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Preloader from './components/common/Preloader/Preloader';
import AppHeader from './components/Header/Header';
// import Footer from './components/Footer/Footer';
import LoginPage from './components/Login/Login';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import { initializeApp } from './redux/appReducer';
import store, { AppStateType } from './redux/redux-store';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ChatPage = React.lazy(() => import('./pages/chat/ChatPage'));

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
      <Layout>
        <AppHeader />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <SidebarContainer/>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Suspense fallback={<Preloader />}>
                <Routes>
                  <Route path='' element={<Navigate to="profile" />} />
                  <Route path='profile' element={<ProfileContainer />}>
                    <Route path=':userId' element={<ProfileContainer />} />
                  </Route>
                  <Route path='dialogs' element={<DialogsContainer />} />
                  <Route path='users' element={<UsersContainer pageTitle={'All users'} />} />
                  <Route path='login' element={<LoginPage />} />
                  <Route path='chat' element={<ChatPage />} />
                  <Route path='*' element={<div>404 Not Found</div>} />
                </Routes>
              </Suspense></Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Social Network Pet-project 2022</Footer>
      </Layout>
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
