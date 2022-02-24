import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { maxLength50 } from './Dialogs';

type NewMessageFormValuesType = {
  newMessageValue: string
}

type PropsType = {
}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={Textarea} name="newMessageValue" id="" cols="30" rows="10" placeholder='Send a message...'
        validate={[required, maxLength50]} />
      <button className="" type="submit">Send</button>
    </form>
  );
};

export default reduxForm<NewMessageFormValuesType, PropsType>({
  form: "dialogAddMessageForm"
})(AddMessageForm);
