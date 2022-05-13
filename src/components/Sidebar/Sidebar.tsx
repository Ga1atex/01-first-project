import { MessageOutlined, UserOutlined, TeamOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, NavLink, useLocation } from "react-router-dom";
import { SidebarInitialStateType } from "../../redux/reducers/sidebarReducer/sidebarReducer";
import { RouteNames } from '../../utils/redirectRules';
import styles from './Sidebar.module.scss';
const { Sider } = Layout;

type MapStateToPropsType = {
  sidebar: SidebarInitialStateType
}

const Sidebar: React.FC<MapStateToPropsType> = (props) => {
  const { pathname } = useLocation();
  const currentPath = '/' + pathname.split('/')[1] || 'profile';

  const sidebarMenuItems = [
    { label: <NavLink to={RouteNames.PROFILE}>Profile</NavLink>, key: RouteNames.PROFILE, icon: <UserOutlined /> },
    { label: <NavLink to={RouteNames.DIALOGS}>Dialogs</NavLink>, key: RouteNames.DIALOGS, icon: <MessageOutlined /> },
    { label: <NavLink to={RouteNames.USERS}>Users</NavLink>, key: RouteNames.USERS, icon: <TeamOutlined /> },
    { label: <NavLink to={RouteNames.CHAT}>Chat</NavLink>, key: RouteNames.CHAT, icon: <WhatsAppOutlined /> }
  ]

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
  )
}

export default Sidebar
