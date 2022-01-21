import { NavLink } from 'react-router-dom';
import styles from './Dialog.module.css'

export default function DialogItem(props) {
  return (
    <li className={styles.dialog}>
      <NavLink to={"/dialogs/1" + props.id}>{props.name}</NavLink>
    </li>
  );
}
