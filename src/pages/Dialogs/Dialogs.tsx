import { FormikHelpers } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddMessageForm, { AddMessageFormPropsType } from '../../components/AddMessageForm/AddMessageForm';
import Messages from '../../components/Messages/Messages';
import { actionCreators } from '../../redux/reducers/dialogsReducer/dialogsReducer';
import { selectDialogsData, selectMessagesData } from '../../redux/reducers/dialogsReducer/dialogsSelectors';
import { useRedirect } from '../../utils/hooks/useRedirect';
import { maxLengthCreator } from '../../utils/validators/validators';
import DialogItem from './Dialog/Dialog';
import styles from './Dialogs.module.scss';

export const maxLength50 = maxLengthCreator(50);

const Dialogs: React.FC = () => {
  const dialogsData = useSelector(selectDialogsData);
  const messagesData = useSelector(selectMessagesData);

  const dispatch = useDispatch()

  const dialogsElements = dialogsData.map(dialog => {
    return <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />;
  })

  const addNewMessage = (values: AddMessageFormPropsType, helpers: FormikHelpers<AddMessageFormPropsType>) => {
    if (!values.newMessageValue) {
      return
    }
    const { setSubmitting, resetForm } = helpers;
    dispatch(actionCreators.sendMessage(values.newMessageValue));
    setSubmitting(false)
    resetForm()
  }

  useRedirect();

  return (
    <div className={styles.dialogs}>
      <ul className={styles.dialogsItems}>
        {dialogsElements}
      </ul>
      <div className={styles.message}>
        <Messages messages={messagesData} />
        <AddMessageForm onSubmit={addNewMessage} />

      </div>
      <div className=""><img src="" alt="" /></div>
    </div>
  );
}

export default Dialogs;
