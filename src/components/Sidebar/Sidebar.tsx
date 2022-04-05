import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { SidebarInitialStateType } from "../../redux/sidebarReducer";

const { Sider } = Layout;

type MapStateToPropsType = {
  sidebar: SidebarInitialStateType
}

const Sidebar: React.FC<MapStateToPropsType> = (props) => {
  // const friendsList = props.sidebar.friendsData.map((friend => <li className={styles.friendsItem} key={friend.id}>
  //   <a className={styles.friendsImg} href=""><Avatar src={''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size={40} /></a>
  //   <span className={styles.friendsFirstName}>{friend.firstName}</span>
  // </li>));

  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

  return (
    <Sider
      className="site-layout-background"
      width={200}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[currentPath]}
        // defaultOpenKeys={['sub1']}
        style={{ height: '100%' }}
      >
        {/* <SubMenu key="sub1" icon={<UserOutlined />} title="My profile"> */}
        <Menu.Item key="profile" icon={<UserOutlined />}><Link to="/profile">Profile</Link></Menu.Item>
        <Menu.Item key="dialogs" icon={<MessageOutlined />}><Link to="/dialogs">Messages</Link></Menu.Item>
        <Menu.Item key="users"><Link to="/users">Users</Link></Menu.Item>
        <Menu.Item key="chat"><Link to="/chat">Chat</Link></Menu.Item>
        {/* </SubMenu> */}
        {/* <ul className={styles.friends}>
            {friendsList}
          </ul> */}
      </Menu>
    </Sider>
  )
}

export default Sidebar
