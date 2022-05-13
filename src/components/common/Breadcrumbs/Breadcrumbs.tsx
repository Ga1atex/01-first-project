import { Breadcrumb } from "antd"
import { NavLink, useLocation } from "react-router-dom"
import { RouteNames } from "../../../utils/redirectRules";

export const Breadcrumbs = () => {
  const breadcrumbNameMap: Record<string, string> = {
    [RouteNames.PROFILE]: 'Profile',
    [RouteNames.DIALOGS]: 'Dialogs',
    [RouteNames.USERS]: 'User List',
    [RouteNames.CHAT]: 'Chat',
    [RouteNames.LOGIN]: 'Login',
  };
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = pathSnippets.slice(0, index + 1).join('/');

    return (
      <Breadcrumb.Item key={url}>
        <NavLink to={url}>{breadcrumbNameMap["/" + url]}</NavLink>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <NavLink to="/">Home</NavLink>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
}
