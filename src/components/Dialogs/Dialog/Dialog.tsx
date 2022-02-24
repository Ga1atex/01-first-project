import { NavLink } from 'react-router-dom';
//@ts-ignore
import styles from './Dialog.module.css'

type PropsType = {
  id: number
  name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
  return (
    <li className={styles.dialog}>
      <a className={styles.dialogAvatar} href=""><img src="@img" alt="" width={40} height={40}/></a>
      <NavLink to={"/dialogs/1" + props.id}>{props.name}</NavLink>
    </li>
  );
}
export default DialogItem
