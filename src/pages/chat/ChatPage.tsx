
import { FormikHelpers } from 'formik';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import AddMessageForm, { AddMessageFormPropsType } from "../../components/AddMessageForm/AddMessageForm";
import Messages from "../../components/Messages/Messages";
import { actionCreators, sendChatMessage, startMessagesListening, stopMessagesListening } from '../../redux/reducers/chatReducer/chatReducer';
import { selectChatMessages, selectChatStatus } from '../../redux/reducers/chatReducer/chatSelectors';
import { useRedirect } from '../../utils/hooks/useRedirect';


const ChatPage: React.FC = () => {
  useRedirect()
  return (
    <Chat />
  )
}

const Chat: React.FC = () => {
  const dispatch = useDispatch()

  const status = useSelector(selectChatStatus)

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
      dispatch(actionCreators.clearState())
    }
  }, [dispatch])

  const sendMessageHandler = (values: AddMessageFormPropsType, helpers: FormikHelpers<AddMessageFormPropsType>) => {
    if (!values.newMessageValue) {
      return
    }
    const { setSubmitting, resetForm } = helpers;

    dispatch(sendChatMessage(values.newMessageValue))
    setSubmitting(false)
    resetForm()
  }

  const messages = useSelector(selectChatMessages)
  return (<>
    {status === 'error' && <div>Some error occured. Please refresh page</div>}
    <Messages messages={messages} />
    <AddMessageForm onSubmit={sendMessageHandler} />
  </>
  )
}


export default ChatPage
