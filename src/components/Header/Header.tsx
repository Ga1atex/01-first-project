import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Layout, Menu, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../App';
import logo from '../../assets/images/logo.svg';
import { logout } from '../../redux/reducers/authReducer/authReducer';
import { selectFullName, selectIsAuth, selectPhotoSmall } from '../../redux/reducers/authReducer/authSelectors';
import styles from './Header.module.scss';

const { Header } = Layout;

export default function AppHeader() {
  const isAuth = useSelector(selectIsAuth)
  // const login = useSelector(selectCurrentUserLogin)
  const fullName = useSelector(selectFullName)
  const photoSmall = useSelector(selectPhotoSmall)

  const dispatch = useDispatch();

  const logoutCallback = () => { dispatch(logout()) }

  return (
    <Header className={styles.header} >
      <div className="container">
        <Row justify="space-between" align="middle">
          <Col flex='0 0 auto'>
            <div className={styles.logo}><Link className={styles.logoLink} to="">
              <img src={logo} className="" alt="logo" width="30px" height="30px" />
              Social Network
            </Link></div>
          </Col>

          {/* <Col span={12}>
            {isAuth
              ? (<>
                <Menu theme="dark" selectable={false} className={styles.loginBlock} >
                  <Menu.Item key="1"  >
                    <Link to={RouteNames.PROFILE}>
                      <Avatar alt={fullName || ''} src={photoSmall} style={{ backgroundColor: '#87d068', flex: "0 0 auto" }} icon={<UserOutlined />} size={50} />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2"  >
                    <Button onClick={logoutCallback}>Log out</Button>
                  </Menu.Item>
                </Menu>
              </>)
              :
              <Menu theme="dark" selectable={false} className={styles.loginBlock} >
                <Menu.Item key="1">
                  <Button><Link to={RouteNames.LOGIN}>Login</Link></Button>
                </Menu.Item>
              </Menu>
            }
          </Col> */}
          <Col flex='0 0 auto'>
            <div className={styles.loginBlock} >
              {isAuth
                ? (<>
                  <Link to={RouteNames.PROFILE}>
                    <Avatar alt={fullName || ''} src={photoSmall} style={{ backgroundColor: '#87d068', flex: "0 0 auto" }} icon={<UserOutlined />} size={50} />
                  </Link>
                  <Button onClick={logoutCallback}>Log out</Button>
                </>)
                : <Button><Link to={RouteNames.LOGIN}>Login</Link></Button>
              }
            </div>
          </Col>
        </Row>
      </div>
    </Header>
  );
}
