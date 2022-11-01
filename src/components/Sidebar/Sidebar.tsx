import {
  MessageOutlined,
  UserOutlined,
  TeamOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { RouteNames } from '../AppRoutes';
import styles from './Sidebar.module.scss';
const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const currentPath = '/' + pathname.split('/')[1] || 'profile';

  const activeClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.sidebarActiveLink : '';

  const sidebarMenuItems = [
    {
      label: (
        <NavLink className={activeClassName} to={RouteNames.PROFILE}>
          Profile
        </NavLink>
      ),
      key: RouteNames.PROFILE,
      icon: <UserOutlined />,
    },
    {
      label: (
        <NavLink className={activeClassName} to={RouteNames.DIALOGS}>
          Dialogs
        </NavLink>
      ),
      key: RouteNames.DIALOGS,
      icon: <MessageOutlined />,
    },
    {
      label: (
        <NavLink className={activeClassName} to={RouteNames.USERS}>
          Users
        </NavLink>
      ),
      key: RouteNames.USERS,
      icon: <TeamOutlined />,
    },
    {
      label: (
        <NavLink className={activeClassName} to={RouteNames.CHAT}>
          Chat
        </NavLink>
      ),
      key: RouteNames.CHAT,
      icon: <WhatsAppOutlined />,
    },
  ];

  return (
    <Sider
      className={styles.siderLayoutBackground}
      width={200}
      breakpoint="lg"
      collapsedWidth={0}
    >
      <Menu
        mode="vertical"
        defaultSelectedKeys={[currentPath]}
        items={sidebarMenuItems}
      />
    </Sider>
  );
};

export default Sidebar;
