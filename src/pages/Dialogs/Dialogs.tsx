import { DatePicker, List } from 'antd';
import { FormikHelpers } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddMessageForm, {
  AddMessageFormPropsType,
} from '../../components/AddMessageForm/AddMessageForm';
import ContentWrapper from '../../components/common/ContentWrapper/ContentWrapper';
import Preloader from '../../components/common/Preloader/Preloader';
import Messages from '../../components/Messages/Messages';
import {
  selectAuthorizedUserId,
  selectPhotoSmall,
} from '../../redux/reducers/authReducer/authSelectors';
import {
  selectDialogsData,
  selectDialogsFetching,
  selectMessagesData,
  selectMessagesFetching,
} from '../../redux/reducers/dialogsReducer/dialogsSelectors';
import {
  getMessages,
  getMessagesNewerThen,
  requestDialogs,
  sendMessage,
} from '../../redux/reducers/dialogsReducer/dialogsThunks';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import DialogItem from './Dialog/Dialog';
import DialogMessage from './DialogMessage/DialogMessage';
import styles from './Dialogs.module.scss';

const Dialogs: React.FC = React.memo(() => {
  const dialogsData = useSelector(selectDialogsData);
  const messagesData = useSelector(selectMessagesData);
  const authPhoto = useSelector(selectPhotoSmall);
  const authId = useSelector(selectAuthorizedUserId);
  const dialogsAreFetching = useSelector(selectDialogsFetching);
  const messagesAreFetching = useSelector(selectMessagesFetching);
  const dispatch = useAppDispatch();
  const params = useParams();

  const userId = Number(params.userId);

  const [currentDialogId, setCurrentDialogId] = useState(0);
  const [currentDialogPhoto, setCurrentDialogPhoto] = useState<
    null | string | undefined
  >(null);

  const addNewMessage = (
    values: AddMessageFormPropsType,
    helpers: FormikHelpers<AddMessageFormPropsType>
  ) => {
    const { setSubmitting, resetForm } = helpers;
    dispatch(sendMessage({ userId: currentDialogId, message: values.message }));

    setSubmitting(false);
    resetForm();
  };

  useEffect(() => {
    dispatch(requestDialogs());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      // small bug here: its checking before dialogs are fetching,
      // possible fixes: change default isFetching to true, or change isFetching to fetchingStatus = "idle | pending | success | fail", or change dialogsData default to null
      const isNewDialog = !dialogsData.some((dialog) => dialog.id === userId);
      dispatch(getMessages({ userId, isNewDialog }));
      setCurrentDialogId(userId);

      if (isNewDialog) {
        dispatch(requestDialogs());
      }
      const currentDialog = dialogsData.find((dialog) => dialog.id === userId);
      setCurrentDialogPhoto(currentDialog?.photos.small);
    }
  }, [userId, dispatch, dialogsData]);

  const dialogsElements = useMemo(
    () =>
      dialogsData.map((dialog) => {
        // return <Tabs.TabPane tab={<DialogItem {...dialog} />} key={dialog.id}></Tabs.TabPane>;
        return <DialogItem key={dialog.id} {...dialog} />;
      }),
    [dialogsData]
  );

  const dateOnChange = (date: moment.Moment | null, dateString: string) => {
    if (dateString) {
      dispatch(
        getMessagesNewerThen({ userId: currentDialogId, date: dateString })
      );
    }
  };

  return (
    <div className={styles.dialogs}>
      {dialogsAreFetching ? (
        <Preloader />
      ) : (
        <ul className={styles.dialogsItems}>{dialogsElements}</ul>
      )}
      {/* <List loading={{ indicator: <Preloader />, spinning: dialogsAreFetching }} className={styles.dialogsItems} dataSource={dialogsData} renderItem={dialog => <DialogItem key={dialog.id} {...dialog} />} />
      { */}
      {messagesAreFetching ? (
        <Preloader />
      ) : !!userId ? (
        <div className={styles.messages}>
          <ContentWrapper>
            <DatePicker onChange={dateOnChange} className={styles.datePicker} />
            <Messages>
              <List
                dataSource={messagesData}
                renderItem={(messageObj) => {
                  const photo =
                    messageObj.senderId === authId
                      ? authPhoto
                      : currentDialogPhoto;
                  return (
                    <DialogMessage
                      key={messageObj.id}
                      message={messageObj}
                      photo={photo}
                    />
                  );
                }}
              />
            </Messages>
          </ContentWrapper>
          <AddMessageForm onSubmit={addNewMessage} />
        </div>
      ) : (
        <div className={styles.messages}>
          <ContentWrapper className={styles.dialogsMessages}>
            Please select companion
          </ContentWrapper>
        </div>
      )}
    </div>
  );
});

// export default compose<React.ComponentType>(withAuthRedirect)(Dialogs);
export default Dialogs;
