import React from 'react';
import { Textarea } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { maxLength50 } from './Dialogs';
import { Field, Form, Formik } from 'formik';

type NewMessageFormValuesType = {
  onSubmit: any
}

const AddMessageForm: React.FC<NewMessageFormValuesType> = (props) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ }}
      validate={undefined}
      onSubmit={props.onSubmit}>
    <Form >
      <Field component={Textarea} name="newMessageValue" id="" cols="30" rows="10" placeholder='Send a message...'
        validate={[required, maxLength50]} />
      <button className="" type="submit">Send</button>
    </Form>
    </Formik>
  );
};

export default AddMessageForm;
