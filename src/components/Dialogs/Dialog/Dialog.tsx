import { Avatar } from 'antd';
import { NavLink } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
//@ts-ignore
import styles from './Dialog.module.css'

type PropsType = {
  id: number
  name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
  return (
    <li className={styles.dialog}>
      <a className={styles.dialogAvatar} href="">
        <Avatar src={''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size={40} />
      </a>
      <NavLink to={"/dialogs/1" + props.id}>{props.name}</NavLink>
    </li>
  );
}
export default DialogItem
