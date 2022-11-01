import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

export const UsersContainer = React.lazy(
  () => import('../pages/Users/UsersContainer')
);
export const LoginPage = React.lazy(() => import('../pages/Login/Login'));
export const Profile = React.lazy(() => import('../pages/Profile/Profile'));
export const Dialogs = React.lazy(() => import('../pages/Dialogs/Dialogs'));
export const ChatPage = React.lazy(() => import('../pages/Chat/ChatPage'));

export enum Roles {
  USER = 'user',
  GUEST = 'guest',
}

export enum RouteNames {
  PROFILE = '/profile',
  PAGE_USER_ID = ':userId',
  DIALOGS = '/dialogs',
  USERS = '/users',
  LOGIN = '/login',
  CHAT = '/chat',
  NO_ACCESS = '/403',
  SERVER_ERROR = '/500',
}

export type RouteRolesType = RouteObject & {
  roles?: Roles[];
  children?: RouteRolesType[];
};

type AppRouteProps = {
  routes: RouteObject[];
};

export const appRoutesRules: RouteRolesType[] = [
  {
    path: '/',
    element: <Navigate to={RouteNames.PROFILE} />,
    roles: [Roles.USER],
  },
  {
    path: RouteNames.PROFILE,
    element: <Profile />,
    roles: [Roles.USER],
    children: [
      {
        path: `${RouteNames.PROFILE}/${RouteNames.PAGE_USER_ID}`,
        element: <Profile />,
        roles: [Roles.USER, Roles.GUEST],
      },
    ],
  },
  {
    path: RouteNames.DIALOGS,
    element: <Dialogs />,
    roles: [Roles.USER],
    children: [
      {
        path: `${RouteNames.DIALOGS}/${RouteNames.PAGE_USER_ID}`,
        element: <Dialogs />,
        roles: [Roles.USER],
      },
    ],
  },
  {
    path: RouteNames.USERS,
    element: <UsersContainer />,

    roles: [Roles.USER, Roles.GUEST],
  },
  { path: RouteNames.LOGIN, element: <LoginPage />, roles: [Roles.GUEST] },
  { path: RouteNames.CHAT, element: <ChatPage />, roles: [Roles.USER] },
  {
    path: RouteNames.NO_ACCESS,
    element: (
      <ErrorPage
        status="403"
        title="403 error"
        subTitle="Access is restricted"
      />
    ),
    roles: [Roles.USER],
  },
  {
    path: RouteNames.SERVER_ERROR,
    element: <ErrorPage status="500" title="Server error" />,
  },
  {
    path: '*',
    element: (
      <ErrorPage
        status="404"
        title="404 error"
        subTitle="Sorry, the page you visited does not exist."
      />
    ),
  },
];

// getting rid of roles property to pass it to useRoutes
export const AppRoutesObj = (routeRoles: RouteRolesType[]): RouteObject[] => {
  return routeRoles.map(({ roles, ...routeProps }: RouteRolesType) => {
    if (routeProps.children) {
      routeProps.children = AppRoutesObj(routeProps.children);
    }

    return routeProps;
  });
};
export const routes = AppRoutesObj(appRoutesRules);

export default function AppRoutes({ routes }: AppRouteProps) {
  return useRoutes(routes);
}
// export const AppRoutes: React.FC<AppRouteProps> = ({ routes }) => {
//   return (<Routes>
//     {routes.map((route) => {
//       return <Route key={route.path} {...route} ></Route>
//     })}
//   </Routes>
//   )
// }
