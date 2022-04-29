import { Button } from 'antd';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { maxLength50 } from '../../pages/Dialogs/Dialogs';
import { composeValidators } from '../../utils/helpers/composeValidators';
import { required } from '../../utils/validators/validators';
import { Textarea } from '../common/FormsControls/FormsControls';
import styles from './AddMessageForm.module.scss'

export type AddMessageFormPropsType = {
  message: string
}
type NewMessageFormValuesType = {
  onSubmit: (values: AddMessageFormPropsType, helpers: FormikHelpers<AddMessageFormPropsType>) => void
}

const AddMessageForm: React.FC<NewMessageFormValuesType> = (props) => {
  const { onSubmit } = props;

  return (
    <Formik
      enableReinitialize
      initialValues={{ message: '' }}
      validate={undefined}
      onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Field component={Textarea} name="message" id="" placeholder='Send a message...' className={styles.textarea}
            validate={composeValidators(required, maxLength50)} />
          <Button className={styles.btn} htmlType="submit" disabled={isSubmitting}>Send</Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddMessageForm;
