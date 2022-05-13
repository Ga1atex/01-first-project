
import { FormikHelpers } from 'formik';
import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import AddMessageForm, { AddMessageFormPropsType } from "../../components/AddMessageForm/AddMessageForm";
import ChatMessage from './ChatMessage/ChatMessage';
import Messages from "../../components/Messages/Messages";
import { actionCreators, sendChatMessage, startMessagesListening, stopMessagesListening } from '../../redux/reducers/chatReducer/chatReducer';
import { selectChatMessages, selectChatStatus } from '../../redux/reducers/chatReducer/chatSelectors';
import { Card } from 'antd';


const ChatPage: React.FC = () => {
  // useRedirect()

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

  const previousMessengerId = useRef<null | number>(null)
  const messages = useSelector(selectChatMessages)
  const sortedMessages = useMemo(() => messages.map((message, i) => {
    if (message.userId !== previousMessengerId.current) {
      previousMessengerId.current = message.userId
      return message.message && <ChatMessage key={message.id} message={message} />
    } else {
      previousMessengerId.current = message.userId
      return <div key={message.id} className="">{message.message}</div>
    }
  }), [messages])
  previousMessengerId.current = null // to reset it, so if an owner of the first and the last message is the same messages will work correctly

  return (<>
    <Card style={{ marginBottom: 20 }} >
      {status === 'error' && <div>Some error occured. Please refresh page</div>}
      <Messages>
        {sortedMessages}
      </Messages>
    </Card>
    <AddMessageForm onSubmit={sendMessageHandler} />
  </>
  )
}


export default ChatPage
