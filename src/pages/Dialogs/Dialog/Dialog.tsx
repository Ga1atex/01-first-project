import { NavLink } from 'react-router-dom';
import UserAvatar from '../../../components/common/UserAvatar/UserAvatar';
import { RouteNames } from '../../../components/AppRoutes';
import styles from './Dialog.module.scss';
import { DialogType } from '../../../types/types';

const DialogItem: React.FC<DialogType> = (props) => {
  const { id, userName, photos } = props;

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.dialogAvatar} ${styles.active}` : styles.dialogAvatar;

  return (
    <li className={styles.dialog}>
      <NavLink className={linkClassName} to={`${RouteNames.DIALOGS}/${id}`}>
        <UserAvatar src={photos.small} size={40} />
        {userName}
      </NavLink>
    </li>
  );
};
export default DialogItem;
