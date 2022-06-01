import { BrowserHistory } from 'history';
import React, { useLayoutEffect, useState } from 'react';
import { BrowserRouterProps, Router } from "react-router-dom";

const HistoryRouter: React.FC<{ history: BrowserHistory } & BrowserRouterProps> = ({ history, children, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
};


export default HistoryRouter;
