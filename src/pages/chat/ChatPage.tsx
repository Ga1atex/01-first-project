
import { FormikHelpers } from 'formik';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import AddMessageForm, { AddMessageFormPropsType } from "../../components/AddMessageForm/AddMessageForm";
import ChatMessage from '../../components/common/ChatMessage/ChatMessage';
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
    const { setSubmitting, resetForm } = helpers;

    dispatch(sendChatMessage(values.message))
    setSubmitting(false)
    resetForm()
  }

  const messages = useSelector(selectChatMessages)
  return (<>
    {status === 'error' && <div>Some error occured. Please refresh page</div>}
    <Messages>
      {messages.map((messageObj) => {
        return messageObj.message && <ChatMessage key={messageObj.id} message={messageObj} />
      })}
    </Messages>
    <AddMessageForm onSubmit={sendMessageHandler} />
  </>
  )
}


export default ChatPage
