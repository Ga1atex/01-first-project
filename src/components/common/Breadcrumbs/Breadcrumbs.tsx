import { Breadcrumb } from "antd"
import { Link, useLocation } from "react-router-dom"
import { RouteNames } from "../../../App";

export const Breadcrumbs = () => {
  const breadcrumbNameMap: Record<string, string> = {
    [RouteNames.PROFILE]: 'Profile',
    [RouteNames.DIALOGS]: 'Dialogs',
    [RouteNames.USERS]: 'User List',
    [RouteNames.CHAT]: 'Chat',
  };
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = pathSnippets.slice(0, index + 1).join('/');
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
}
