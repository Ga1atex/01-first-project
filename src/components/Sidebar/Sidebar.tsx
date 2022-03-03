import { Link, NavLink } from "react-router-dom";
import { SidebarInitialStateType } from "../../redux/sidebarReducer";
//@ts-ignore
import styles from './Sidebar.module.css';
import { Breadcrumb, Layout, Menu } from 'antd';
import { LaptopOutlined, MessageOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;


type MapStateToPropsType = {
  sidebar: SidebarInitialStateType
}

const Sidebar: React.FC<MapStateToPropsType> = (props) => {
  const friendsList = props.sidebar.friendsData.map((friend => <li className={styles.friendsItem} key={friend.id}>
    <a className={styles.friendsImg} href=""><img src="" alt={friend.firstName + "'s avatar"} width="60" height="60" /></a>
    <span className={styles.friendsFirstName}>{friend.firstName}</span>
  </li>));

    return (
      <Sider className="site-layout-background" width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
        >
          {/* <SubMenu key="sub1" icon={<UserOutlined />} title="My profile"> */}
          <Menu.Item key="1" icon={<UserOutlined />}><Link to="/profile">Profile</Link></Menu.Item>
          <Menu.Item key="2" icon={<MessageOutlined />}><Link to="/dialogs">Messages</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/users">Users</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/chat">Chat</Link></Menu.Item>
          {/* </SubMenu> */}
        </Menu>
      </Sider>
    // <aside className={styles.sidebar}>
    //   <nav className='sidebar__menu menu'>
    //     <ul className='menu__list'>
    //       <li className={styles.menuItem}><NavLink to="/profile" className={(navData) => (navData.isActive ? styles.active : '')}>Profile</NavLink></li>
    //       <li className={styles.menuItem}><NavLink to="/dialogs" className={(navData) => (navData.isActive ? styles.active : '')}>Messages</NavLink></li>
    //       <li className={styles.menuItem}><NavLink to="/users" className={(navData) => (navData.isActive ? styles.active : '')}>Users</NavLink></li>
    //       <li className={styles.menuItem}><NavLink to="/feed" className={(navData) => (navData.isActive ? styles.active : '')}>News</NavLink></li>
    //       <li className={styles.menuItem}><NavLink to="/audios" className={(navData) => (navData.isActive ? styles.active : '')}>Music</NavLink></li>
    //       <li className={styles.menuItem}><NavLink to="/settings" className={(navData) => (navData.isActive ? styles.active : '')}>Settings</NavLink></li>
    //       <li className={styles.menuItem}><NavLink to="/friends" className={(navData) => (navData.isActive ? styles.active : '')}>Friends</NavLink>
    //         <ul className={styles.friends}>
    //           {friendsList}
    //         </ul>
    //       </li>
    //     </ul>
    //   </nav>
    // </aside>
    )
}

export default Sidebar
