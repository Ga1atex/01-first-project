import { NavLink } from 'react-router-dom';
import styles from './Dialog.module.css'

export default function DialogItem(props) {
  return (
    <li className={styles.dialog}>
      <a className={styles.dialogAvatar} href=""><img src="@img" alt="" width={40} height={40}/></a>
      <NavLink to={"/dialogs/1" + props.id}>{props.name}</NavLink>
    </li>
  );
}
