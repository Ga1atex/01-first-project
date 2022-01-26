import DialogItem from './Dialog/Dialog';
import styles from './Dialogs.module.css'
import Message from './Message/Message';
import React from 'react';
import { sendMessageActionCreator, updateTextActionCreator } from '../../redux/dialogsReducer';

export default function Dialogs(props) {
  const dialogsElements = props.dialogsPage.dialogsData.map(dialog => {
    return <DialogItem name={dialog.name} id={dialog.id} />;
  })
  const messagesElements = props.dialogsPage.messagesData.map(message => {
    return <Message textMessage={message.text} />;
  })

  const newMessageElement = React.createRef();

  const sendMessage = () => {
    const text = newMessageElement.current.value;
    if (text) {
      const action = sendMessageActionCreator(text)
      props.dispatch(action);
    }
  }

  const updateNewMessageText = (event) => {
    // const text = newMessageElement.current.value;
    const text = event.target.value;
    const action = updateTextActionCreator(text, 'dialogsPage')
    props.dispatch(action);
  }

  return (
    <div className={styles.dialogs}>
      <ul className={styles.dialogsItems}>
        {dialogsElements}
      </ul>
      <div className={styles.message}>
        {messagesElements}
        <textarea name="" id="" ref={newMessageElement} cols="30" rows="10" value={props.dialogsPage.textAreaText} onChange={updateNewMessageText} placeholder='Send a message...'/>
        <button className="" type="button" onClick={sendMessage}>Send</button>
      </div>
      <div className=""><img src="" alt="" /></div>
    </div>
  );
}
