import React from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import LoginPage from '../pages/Login/Login';
import Page404 from "../pages/Page404/Page404";

export const UsersContainer = React.lazy(() => import('../pages/Users/UsersContainer'));
export const Profile = React.lazy(() => import('../pages/Profile/Profile'));
export const Dialogs = React.lazy(() => import('../pages/Dialogs/Dialogs'));
export const ChatPage = React.lazy(() => import('../pages/Chat/ChatPage'));

export enum Roles {
  USER = 'user',
  GUEST = 'guest'
}

export enum RouteNames {
  PROFILE = '/profile',
  PAGE_USERID = ':userId',
  DIALOGS = '/dialogs',
  USERS = '/users',
  LOGIN = '/login',
  CHAT = '/chat'
}

export type RedirectRulesType = {
  route: RouteObject,
  role?: Roles[],
  children?: RedirectRulesType[]
}

export const appRoutesRules: RedirectRulesType[] = [
  { route: { path: "/", element: <Navigate to={RouteNames.PROFILE} /> }, role: [Roles.USER] },
  {
    route: { path: RouteNames.PROFILE, element: <Profile /> }, role: [Roles.USER], children: [{
      route: { path: `${RouteNames.PROFILE}/${RouteNames.PAGE_USERID}`, element: <Profile /> }, role: [Roles.USER, Roles.GUEST]
    },]
  },
  {
    route: { path: RouteNames.DIALOGS, element: <Dialogs /> }, role: [Roles.USER], children: [{
      route: { path: `${RouteNames.DIALOGS}/${RouteNames.PAGE_USERID}`, element: <Dialogs /> }, role: [Roles.USER]
    }]
  },
  { route: { path: RouteNames.USERS, element: <UsersContainer pageTitle={'All users'} /> }, role: [Roles.USER, Roles.GUEST] },
  { route: { path: RouteNames.LOGIN, element: <LoginPage /> }, role: [Roles.GUEST] },
  { route: { path: RouteNames.CHAT, element: <ChatPage /> }, role: [Roles.USER] },
  { route: { path: '*', element: <Page404 /> } },
]

export const AppRoutesObj = (appRoutesRules: RedirectRulesType[]) => {
  return appRoutesRules.reduce((acc: RouteObject[], item: RedirectRulesType) => {
    let route = item.route;

    if (item.children) {
      let childrenArr = AppRoutesObj(item.children)
      route = { ...route, children: childrenArr }
    }
    return [...acc, route]
  }, [])
}
export default function AppRoutes({ appRoutesRules }: { appRoutesRules: RedirectRulesType[] }) {
  return useRoutes(AppRoutesObj(appRoutesRules));
}
// export const AppRoutes: React.FC<{ appRoutesRules: RedirectRulesType[] }> = ({ appRoutesRules }) => {
//   return (<Routes>
//     {appRoutesRules.map((route) => {
//       return <Route key={route.route.path} {...route.route} ></Route>
//     })}
//   </Routes>
//   )
// }
