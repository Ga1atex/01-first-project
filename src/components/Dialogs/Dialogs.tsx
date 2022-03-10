import DialogItem from './Dialog/Dialog'
import styles from './Dialogs.module.css'
import Message from './Message/Message';
import React from 'react';
import { maxLengthCreator } from '../../utils/validators/validators';
import AddMessageForm from './AddMessageForm';
import { useRedirect } from '../../hoc/useRedirect';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { actionCreators } from '../../redux/dialogsReducer';

export const maxLength50 = maxLengthCreator(50);

const Dialogs: React.FC = (props) => {
  const state = useSelector((state:AppStateType) => state.dialogsPage);

  const dispatch = useDispatch()

  const dialogsElements = state.dialogsData.map(dialog => {
    return <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />;
  })
  const messagesElements = state.messagesData.map(message => {
    return <Message textMessage={message.text} key={message.id}/>;
  })

  const addNewMessage = (values: { newMessageValue: string}) => {
    if (values.newMessageValue) {
      dispatch(actionCreators.sendMessage(values.newMessageValue));
    }
  }

  useRedirect()

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
