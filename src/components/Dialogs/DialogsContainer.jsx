import Dialogs from './Dialogs';
import React from 'react';
import { sendMessageActionCreator, updateTextActionCreator } from '../../redux/dialogsReducer';

export default function DialogsContainer(props) {
  const state = props.store.getState().dialogsPage;

  const sendMessage = (text) => {
      const action = sendMessageActionCreator(text)
      props.store.dispatch(action);
    }

  const updateNewMessageText = (text) => {
    const action = updateTextActionCreator(text)
    props.store.dispatch(action);
  }

  return (
    <Dialogs updateNewMessageText={updateNewMessageText} sendMessage={sendMessage} dialogsPage={state}/>
  );
}
