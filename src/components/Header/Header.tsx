import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Layout, Menu, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import { logout } from '../../redux/reducers/authReducer/authReducer';
import { selectFullName, selectIsAuth, selectPhotoSmall } from '../../redux/reducers/authReducer/authSelectors';
import { RouteNames } from '../../utils/redirectRules';
import styles from './Header.module.scss';

const { Header } = Layout;

export default function AppHeader() {
  const isAuth = useSelector(selectIsAuth)
  // const login = useSelector(selectCurrentUserLogin)
  const fullName = useSelector(selectFullName)
  const photoSmall = useSelector(selectPhotoSmall)

  const dispatch = useDispatch();

  const logoutCallback = () => { dispatch(logout()) }

  const authMenuItems = [
    {
      label: <Link to={RouteNames.PROFILE}>
        <Avatar alt={fullName || ''} src={photoSmall} style={{ backgroundColor: '#87d068', flex: "0 0 auto" }} icon={<UserOutlined />} size={50} />
      </Link>, key: 'item-1'
    }, // remember to pass the key prop
    { label: <Button onClick={logoutCallback}>Log out</Button>, key: 'item-2' },
  ];
  const nonAuthMenuItems = [
    { label: <Button><Link to={RouteNames.LOGIN}>Login</Link></Button>, key: 'item-1' },
  ];

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

          <Col >
            <Menu theme="dark" selectable={false} mode="horizontal" items={isAuth ? authMenuItems : nonAuthMenuItems} disabledOverflow />
          </Col>
          {/* <Col flex='0 0 auto'>
            <div className={styles.loginBlock} >
              {isAuth
                ? (<Space size="small">
                  <Link to={RouteNames.PROFILE}>
                    <Avatar alt={fullName || ''} src={photoSmall} style={{ backgroundColor: '#87d068', flex: "0 0 auto" }} icon={<UserOutlined />} size={50} />
                  </Link>
                  <Button onClick={logoutCallback}>Log out</Button>
                </Space>)
                : <Link to={RouteNames.LOGIN}><Button tabIndex={-1}>Login</Button></Link>
              }
            </div>
          </Col> */}
        </Row>
      </div>
    </Header>
  );
}
