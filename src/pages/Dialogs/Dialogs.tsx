import { Card, DatePicker } from 'antd';
import { FormikHelpers } from 'formik';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddMessageForm, { AddMessageFormPropsType } from '../../components/AddMessageForm/AddMessageForm';
import DialogMessage from '../../components/common/DialogMessage/DialogMessage';
import Messages from '../../components/Messages/Messages';
import { selectAuthorizedUserId, selectPhotoSmall } from '../../redux/reducers/authReducer/authSelectors';
import { actionCreators, getMessagesNewerThen, requestDialogs, sendMessage, startDialog } from '../../redux/reducers/dialogsReducer/dialogsReducer';
import { selectCurrentDialogId, selectDialogsData, selectMessagesData } from '../../redux/reducers/dialogsReducer/dialogsSelectors';
import { useRedirect } from '../../utils/hooks/useRedirect';
import { maxLengthCreator } from '../../utils/validators/validators';
import DialogItem from './Dialog/Dialog';
import styles from './Dialogs.module.scss';

export const maxLength50 = maxLengthCreator(50);

const Dialogs: React.FC = React.memo(() => {
  useRedirect();

  const dialogsData = useSelector(selectDialogsData);
  const messagesData = useSelector(selectMessagesData);
  const authPhoto = useSelector(selectPhotoSmall)
  const authId = useSelector(selectAuthorizedUserId)
  const currentDialogId = useSelector(selectCurrentDialogId)

  const dispatch = useDispatch()
  const params = useParams()

  const userId = Number(params.userId)

  const addNewMessage = (values: AddMessageFormPropsType, helpers: FormikHelpers<AddMessageFormPropsType>) => {
    const { setSubmitting, resetForm } = helpers;
    dispatch(sendMessage(currentDialogId, values.message))

    setSubmitting(false)
    resetForm()
  }

  useEffect(() => {
    dispatch(requestDialogs())
  }, [dispatch])

  useEffect(() => {
    if (userId) {
      dispatch(startDialog(userId))
      dispatch(actionCreators.setCurrentDialogId(userId))
    }
  }, [userId, dispatch])

  const dialogsElements = useMemo(() => dialogsData.map(dialog => {
    // return <Tabs.TabPane tab={<DialogItem {...dialog} />} key={dialog.id}></Tabs.TabPane>;
    return <DialogItem key={dialog.id} {...dialog} />;
  }), [dialogsData])

  const selectedMessages = useMemo(() => messagesData.filter(item => item.recipientId === currentDialogId), [messagesData, currentDialogId]);

  const dateOnChange = (date: moment.Moment | null, dateString: string) => {
    if (dateString) {
      dispatch(getMessagesNewerThen(currentDialogId, dateString))
    }

  }

  return (
    <div className={styles.dialogs}>
      <ul className={styles.dialogsItems}>
        {dialogsElements}
      </ul>
      {!!userId && (<div className={styles.message}>
        <Card style={{ marginBottom: 20 }} >
          <DatePicker onChange={dateOnChange} style={{ marginBottom: 12 }} />
          <Messages>
            {selectedMessages.map((messageObj) => {
              const photo = messageObj.senderId === authId ? authPhoto : null
              return <DialogMessage key={messageObj.id} message={messageObj} photo={photo
              } />
            })}
          </Messages>
        </Card>
        <AddMessageForm onSubmit={addNewMessage} />
      </div>)
      }
    </div>
  );
})

export default Dialogs;
