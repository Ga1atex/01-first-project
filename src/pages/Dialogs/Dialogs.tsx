import { Card, DatePicker } from 'antd';
import { FormikHelpers } from 'formik';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddMessageForm, { AddMessageFormPropsType } from '../../components/AddMessageForm/AddMessageForm';
import Messages from '../../components/Messages/Messages';
import { selectAuthorizedUserId, selectIsAuth, selectPhotoSmall } from '../../redux/reducers/authReducer/authSelectors';
import { actionCreators, getMessagesNewerThen, requestDialogs, sendMessage, startDialog } from '../../redux/reducers/dialogsReducer/dialogsReducer';
import { selectCurrentDialogId, selectDialogsData, selectMessagesData } from '../../redux/reducers/dialogsReducer/dialogsSelectors';
import { maxLengthCreator } from '../../utils/validators/validators';
import DialogItem from './Dialog/Dialog';
import DialogMessage from './DialogMessage/DialogMessage';
import styles from './Dialogs.module.scss';

export const maxLength50 = maxLengthCreator(50);

// const DialogsPage: React.FC = () => {
//   const isAuth = useSelector(selectIsAuth)

//   // if (!isAuth) {
//   //   return <Navigate to={"/login"} />
//   // }
//   let navigate = useNavigate();
//   useEffect(() => {
//     if (!isAuth) {
//       return navigate("/login", { replace: true });
//     }
//   }, [isAuth, navigate]);
//   return (
//     <Dialogs />
//   )
// }
const Dialogs: React.FC = React.memo(() => {
  const isAuth = useSelector(selectIsAuth)
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

  // useRedirect();
  useEffect(() => {
    // if (isAuth)
    dispatch(requestDialogs())
  }, [dispatch, isAuth])

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
      {!!userId
        ? (<div className={styles.message}>
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
        : <div className={styles.message}>
          <Card style={{ marginBottom: 20 }} >Please select companion</Card>
        </div>
      }
    </div>
  );
})

// export default compose<React.ComponentType>(withAuthRedirect)(Dialogs);
export default Dialogs;
