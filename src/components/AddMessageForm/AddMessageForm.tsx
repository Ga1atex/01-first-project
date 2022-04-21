import { Button } from 'antd';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { maxLength50 } from '../../pages/Dialogs/Dialogs';
import { required } from '../../utils/validators/validators';
import { Textarea } from '../common/FormsControls/FormsControls';
import styles from './AddMessageForm.module.scss'

export type AddMessageFormPropsType = {
  newMessageValue: string
}
type NewMessageFormValuesType = {
  onSubmit: (values: AddMessageFormPropsType, helpers: FormikHelpers<AddMessageFormPropsType>) => void
}

const AddMessageForm: React.FC<NewMessageFormValuesType> = (props) => {
  const { onSubmit } = props;

  return (
    <Formik
      enableReinitialize
      initialValues={{ newMessageValue: '' }}
      validate={undefined}
      onSubmit={onSubmit}>
      <Form >
        <Field component={Textarea} name="newMessageValue" id="" placeholder='Send a message...' className={styles.textarea}
          validate={[required, maxLength50]} />
        <Button className="" htmlType="submit">Send</Button>
      </Form>
    </Formik>
  );
};

export default AddMessageForm;

  // without Formik
  // const status = useSelector(selectChatStatus)
  // const [message, setMessage] = useState('')
  // const sendMessageHandler = () => {
  //   if (!message) {
  //     return
  //   }
  //   dispatch(sendMessage(message))
  //   setMessage('')
  // }
  // return (
  //   <div className="">
  //     <textarea onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.currentTarget.value)} value={message} name="" id="" cols={30} rows={10}></textarea>
  //   <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
  //   </div>
  // )
