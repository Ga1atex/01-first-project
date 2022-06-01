import { Button, Col, Layout, Menu, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import { logout } from "../../redux/reducers/authReducer/authThunks";
import { selectFullName, selectIsAuth, selectPhotoSmall } from '../../redux/reducers/authReducer/authSelectors';
import { RouteNames } from '../../utils/redirectRules';
import UserAvatar from '../common/UserAvatar/UserAvatar';
import styles from './Header.module.scss';

const { Header } = Layout;

export default function AppHeader() {
  const isAuth = useSelector(selectIsAuth)
  const fullName = useSelector(selectFullName)
  const photoSmall = useSelector(selectPhotoSmall)

  const dispatch = useDispatch();

  const logoutCallback = () => { dispatch(logout()) }

  const authMenuItems = [
    {
      label: <Link to={RouteNames.PROFILE}>
        <UserAvatar alt={fullName || ''} src={photoSmall} size={50} />
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
          <Col flex='0 1 auto'>
            <div className={styles.logo}>
              <Link className={styles.logoLink} to="/">
                <img src={logo} className="" alt="logo" width="30px" height="30px" />
                Social Network
              </Link>
            </div>
          </Col>

          <Col >
            <Menu
              theme="dark"
              selectable={false}
              mode="horizontal"
              items={isAuth ? authMenuItems : nonAuthMenuItems}
              disabledOverflow
            />
          </Col>
        </Row>
      </div>
    </Header >
  );
}
