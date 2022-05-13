import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { NavLink } from 'react-router-dom';
import { DialogType } from '../../../redux/reducers/dialogsReducer/dialogsReducer';
import { RouteNames } from '../../../utils/redirectRules';
import styles from './Dialog.module.scss';

const DialogItem: React.FC<DialogType> = (props) => {
  const { id, userName, photos } = props;

  const linkClassName = ({ isActive }: { isActive: boolean }) => isActive ? `${styles.dialogAvatar} ${styles.active}` : styles.dialogAvatar

  return (
    <li className={styles.dialog} >
      <NavLink className={linkClassName} to={`${RouteNames.DIALOGS}/${id}`}>
        <Avatar src={photos.small} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size={40} />
        {userName}
      </NavLink>
    </li>
  );
}
export default DialogItem
