import DialogItem from './Dialog/Dialog';
import styles from './Dialogs.module.css'
import Message from './Message/Message';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const maxLength50 = maxLengthCreator(50);

export default function Dialogs(props) {
  const state = props.dialogsPage;

  const dialogsElements = state.dialogsData.map(dialog => {
    return <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />;
  })
  const messagesElements = state.messagesData.map(message => {
    return <Message textMessage={message.text} key={message.id}/>;
  })

  const addNewMessage = (values) => {
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
        <AddMessageFormRedux onSubmit={addNewMessage}/>

      </div>
      <div className=""><img src="" alt="" /></div>
    </div>
  );
}

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={Textarea} name="newMessageValue" id="" cols="30" rows="10" placeholder='Send a message...'
        validate={[required, maxLength50]}/>
      <button className="" type="submit">Send</button>
    </form>
  );
};

const AddMessageFormRedux = reduxForm({
  form: "dialogAddMessageForm"
})(AddMessageForm);
