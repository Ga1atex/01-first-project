
import { FormikHelpers } from 'formik';
import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import AddMessageForm, { AddMessageFormPropsType } from "../../components/AddMessageForm/AddMessageForm";
import ChatMessage from './ChatMessage/ChatMessage';
import Messages from "../../components/Messages/Messages";
import { sendChatMessage, startMessagesListening, stopMessagesListening } from "../../redux/reducers/chatReducer/chatThunks";
import { selectChatMessages, selectChatStatus } from '../../redux/reducers/chatReducer/chatSelectors';
import ContentWrapper from '../../components/common/ContentWrapper/ContentWrapper';
import { chatActionCreators } from '../../redux/reducers/chatReducer/chatReducer';


const ChatPage: React.FC = () => {
  // useRedirect()

  return (
    <Chat />
  )
}

const Chat: React.FC = () => {
  const dispatch = useDispatch()

  const status = useSelector(selectChatStatus)
  const messages = useSelector(selectChatMessages)
  const previousMessengerId = useRef<null | number>(null)

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
      dispatch(chatActionCreators.clearState())
    }
  }, [dispatch])

  const sendMessageHandler = (values: AddMessageFormPropsType, helpers: FormikHelpers<AddMessageFormPropsType>) => {
    const { setSubmitting, resetForm } = helpers;

    dispatch(sendChatMessage(values.message))
    setSubmitting(false)
    resetForm()
  }

  const sortedMessages = useMemo(() => messages.map((message, i) => {
    if (message.userId !== previousMessengerId.current) {
      previousMessengerId.current = message.userId
      return <ChatMessage key={message.id} message={message} />
    } else {
      previousMessengerId.current = message.userId
      return message.message && <div key={message.id} className="">{message.message}</div>
    }
  }), [messages])
  previousMessengerId.current = null // to reset it, so if an owner of the first and the last message is the same, messages will work correctly

  return (<>
    <ContentWrapper  >
      {status === 'error' && <div>Some error occured. Please refresh page</div>}
      <Messages>
        {sortedMessages}
      </Messages>
    </ContentWrapper>
    <AddMessageForm onSubmit={sendMessageHandler} />
  </>
  )
}


export default ChatPage
