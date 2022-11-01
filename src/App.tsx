import { Layout, message } from 'antd';
import 'antd/dist/antd.min.css';
import { createBrowserHistory } from 'history';
import React, { Suspense, useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import './App.scss';
import AppRoutes, { routes } from './components/AppRoutes';
import { Breadcrumbs } from './components/common/Breadcrumbs/Breadcrumbs';
import Preloader from './components/common/Preloader/Preloader';
import AppHeader from './components/Header/Header';
import HistoryRouter from './components/HistoryRouter/HistoryRouter';
import { RedirectHandler } from './components/RedirectHandler/RedirectHandler';
import Sidebar from './components/Sidebar/Sidebar';
import { selectInitialized } from './redux/reducers/appReducer/appSelectors';
import { initializeApp } from './redux/reducers/appReducer/appThunks';
import store from './redux/store';
import { useAppDispatch } from './utils/hooks/reduxHooks';

export const history = createBrowserHistory();
const { Content } = Layout;

export const App: React.FC = () => {
  const initialized = useSelector(selectInitialized);
  const dispatch = useAppDispatch();

  const catchAllUnhandledErrors = (
    promiseRejectionEvent: PromiseRejectionEvent
  ) => {
    message.error(
      promiseRejectionEvent.reason + ' in ' + promiseRejectionEvent.target
    );
  };

  useEffect(() => {
    dispatch(initializeApp());
    window.addEventListener('unhandledrejection', catchAllUnhandledErrors);

    return () => {
      window.removeEventListener('unhandledrejection', catchAllUnhandledErrors);
    };
  }, [dispatch]);

  if (!initialized) {
    return <Preloader />;
  }

  return (
    <Layout>
      <AppHeader />
      <Content className="container">
        <Breadcrumbs />
        <Layout className="site-layout">
          <Sidebar />
          <div className="site-layout-content">
            <Suspense fallback={<Preloader />}>
              <RedirectHandler>
                <AppRoutes routes={routes} />
              </RedirectHandler>
            </Suspense>
          </div>
        </Layout>
      </Content>
    </Layout>
  );
};

const SocialNetworkApp: React.FC = () => {
  return (
    <HistoryRouter history={history} basename={process.env.PUBLIC_URL}>
      {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </BrowserRouter> */}
    </HistoryRouter>
  );
};

export default SocialNetworkApp;
