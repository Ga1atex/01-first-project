import styles from './Message.module.css'

export default function Message(props) {
  return (
    <div className={styles.message}>{props.textMessage}</div>
  );
}
