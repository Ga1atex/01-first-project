import styles from './Message.module.css'

type ProptsType = {
  textMessage: string
}

const Message: React.FC<ProptsType> = (props) => {
  return (
    <div className={styles.message}>{props.textMessage}</div>
  );
}

export default Message
