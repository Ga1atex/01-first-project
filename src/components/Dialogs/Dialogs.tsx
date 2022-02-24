import DialogItem from './Dialog/Dialog'
//@ts-ignore
import styles from './Dialogs.module.css'
import Message from './Message/Message';
import React from 'react';
import { maxLengthCreator } from '../../utils/validators/validators';
import AddMessageForm from './AddMessageForm';
import { InitialStateType } from '../../redux/dialogsReducer';

export const maxLength50 = maxLengthCreator(50);

type OwnPropsType ={
  dialogsPage: InitialStateType
  sendMessage: (messageText: string) => void
}

const Dialogs: React.FC<OwnPropsType> = (props) => {
  const state = props.dialogsPage;

  const dialogsElements = state.dialogsData.map(dialog => {
    return <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />;
  })
  const messagesElements = state.messagesData.map(message => {
    return <Message textMessage={message.text} key={message.id}/>;
  })

  const addNewMessage = (values: { newMessageValue: string}) => {
    if (values.newMessageValue) {
      props.sendMessage(values.newMessageValue);
    }
  }

  return (
    <div className={styles.dialogs}>
      <ul className={styles.dialogsItems}>
        {dialogsElements}
      </ul>
      <div className={styles.message}>
        {messagesElements}
        <AddMessageForm onSubmit={addNewMessage}/>

      </div>
      <div className=""><img src="" alt="" /></div>
    </div>
  );
}

export default Dialogs;
