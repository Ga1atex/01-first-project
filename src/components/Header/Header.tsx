import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Layout, Menu, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// @ts-ignore
import logo from '../../assets/images/logo.svg';
import { logout } from '../../redux/authReducer';
import { selectFullName, selectIsAuth, selectPhotoSmall } from '../../redux/authSelectors';
// @ts-ignore
import styles from './Header.module.css';

const { Header } = Layout;
type PropsType = {
}

export default function AppHeader(props: PropsType) {
  const isAuth = useSelector(selectIsAuth)
  // const login = useSelector(selectCurrentUserLogin)
  const fullName = useSelector(selectFullName)
  const photoSmall = useSelector(selectPhotoSmall)

  const dispatch = useDispatch();

  const logoutCallback = () => { dispatch(logout()) }

  return (
    <Header className="header">
      <Row justify="space-between" style={{ alignItems: 'center'}}>
        <Col span={4}>
          <div className={styles.logo}><a className={styles.logoLink} href="">
            <img src={logo} className="" alt="logo" width="30px" height="30px" />
            Social Network
          </a></div>
        </Col>
        <Col span={16}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
          </Menu></Col>
        <Col span={4}>
          <div className={styles.loginBlock} >
            {isAuth
              ? (<>
                <Avatar alt={fullName || ''} src={photoSmall} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size={50} />
                {/* <img src={photoSmall != null ? photoSmall : propsPhoto} alt={"Your avatar"} width={60} height={60} /> */}
                <Button onClick={logoutCallback}>Log out</Button>
              </>)
              : <Button><Link to={'/login'}>Login</Link></Button>
            }
          </div>

        </Col>
      </Row>

    </Header>
  );
}
