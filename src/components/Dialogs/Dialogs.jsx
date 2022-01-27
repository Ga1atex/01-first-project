import DialogItem from './Dialog/Dialog';
import styles from './Dialogs.module.css'
import Message from './Message/Message';
import React from 'react';

export default function Dialogs(props) {
  const state = props.dialogsPage;

  const dialogsElements = state.dialogsData.map(dialog => {
    return <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />;
  })
  const messagesElements = state.messagesData.map(message => {
    return <Message textMessage={message.text} key={message.id}/>;
  })

  const newMessageElement = React.createRef();

  const sendMessage = () => {
    const text = newMessageElement.current.value;
    if (text) {
      props.sendMessage(text);
    }
  }

  const updateNewMessageText = (event) => {
    const textValue = event.target.value;
    props.updateNewMessageText(textValue)
  }

  return (
    <div className={styles.dialogs}>
      <ul className={styles.dialogsItems}>
        {dialogsElements}
      </ul>
      <div className={styles.message}>
        {messagesElements}
        <textarea name="" id="" ref={newMessageElement} cols="30" rows="10" value={state.textAreaText} onChange={updateNewMessageText} placeholder='Send a message...'/>
        <button className="" type="button" onClick={sendMessage}>Send</button>
      </div>
      <div className=""><img src="" alt="" /></div>
    </div>
  );
}
