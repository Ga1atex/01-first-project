import { Layout, message } from 'antd';
import 'antd/dist/antd.min.css';
import { createBrowserHistory } from "history";
import React, { Suspense, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { Breadcrumbs } from './components/common/Breadcrumbs/Breadcrumbs';
import Preloader from './components/common/Preloader/Preloader';
import AppHeader from './components/Header/Header';
import HistoryRouter from './components/HistoryRouter/HistoryRouter';
import { RedirectHandler } from './components/RedirectHandler/RedirectHandler';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import { selectInitialized } from './redux/reducers/appReducer/appSelectors';
import { initializeApp } from "./redux/reducers/appReducer/appThunks";
import store from './redux/store';
import AppRoutes, { appRoutesRules } from './components/AppRoutes';

export const history = createBrowserHistory();
const { Content } = Layout;

const App: React.FC = () => {
  const initialized = useSelector(selectInitialized)
  const dispatch = useDispatch()

  const catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
    message.error(promiseRejectionEvent.reason + " in " + promiseRejectionEvent.target);
  }
  useEffect(() => {
    dispatch(initializeApp());
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors);

    return () => {
      window.removeEventListener("unhandledrejection", catchAllUnhandledErrors);
    }
  }, [dispatch])
  if (!initialized) {
    return <Preloader />;
  }

  return (
    <Layout >
      <AppHeader />
      <Content className="container">
        <Breadcrumbs />
        <Layout className="site-layout" >
          <SidebarContainer />
          <div className="site-layout-content" >
            <Suspense fallback={<Preloader />}>
              <RedirectHandler>
                <AppRoutes appRoutesRules={appRoutesRules} />
              </RedirectHandler>
            </Suspense>
          </div>
        </Layout>
      </Content>
    </Layout>
  );
}

const SocialNetworkApp: React.FC = () => {
  return (
    <HistoryRouter history={history} basename={process.env.PUBLIC_URL} >
      {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </BrowserRouter> */}
    </HistoryRouter>
  );
};

export default SocialNetworkApp;
