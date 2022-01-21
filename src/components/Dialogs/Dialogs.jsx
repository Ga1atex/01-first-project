import DialogItem from './Dialog/Dialog';
import styles from './Dialogs.module.css'
import Message from './Message/Message';

export default function Dialogs(props) {
  const dialogsElements = props.dialogsData.map(dialog => {
    return <DialogItem name={dialog.name} id={dialog.id} />;
  })
  const messagesElements = props.messagesData.map(message => {
    return <Message textMessage={message.text} />;
  })


  return (
    <div className={styles.dialogs}>
      <ul className={styles.dialogsItems}>
        {dialogsElements}
      </ul>
      <div className={styles.message}>
        {messagesElements}
      </div>
      <div className=""><img src="" alt="" /></div>
    </div>
  );
}
