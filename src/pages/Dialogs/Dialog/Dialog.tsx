import { Avatar } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import styles from './Dialog.module.css'

type PropsType = {
  id: number
  name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
  const { id, name } = props;
  return (
    <li className={styles.dialog}>
      <Link className={styles.dialogAvatar} to="">
        <Avatar src={''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size={40} />
      </Link>
      <NavLink to={"/dialogs/1" + id}>{name}</NavLink>
    </li>
  );
}
export default DialogItem
