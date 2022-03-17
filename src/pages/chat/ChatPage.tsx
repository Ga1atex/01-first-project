import { UserOutlined } from '@ant-design/icons';
import { Avatar } from "antd";
import { Field, Form, Formik } from 'formik';
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ChatMessageAPIType } from '../../api/chatAPI';
import { useRedirect } from '../../hoc/useRedirect';
import { actionCreators, sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chatReducer';
import { AppStateType } from '../../redux/redux-store';
import { v1 as uuidv1 } from 'uuid';


const ChatPage: React.FC = () => {
  useRedirect()
  return (
    <Chat />
  )
}

const Chat: React.FC = () => {
  const dispatch = useDispatch()

  const status = useSelector((state: AppStateType) => state.chat.status)

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
      dispatch(actionCreators.clearState())
    }
  }, [])

  return (<>
    {status === 'error' && <div>Some error occured. Please refresh page</div>}
    <Messages />
    <AddMessageForm />
  </>
  )
}

const Messages: React.FC = () => {

  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)

  const [isAutoScroll, setIsAutoScroll] = useState(false)

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const el = e.currentTarget;
    if(Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 100) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
     isAutoScroll && setIsAutoScroll(false)
    }
    // setIsAutoScroll(Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 100)
  }

  useEffect(() => {
    if (isAutoScroll){
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (<div className="" style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHandler}>
    {messages.map((messageObj) => <Message key={messageObj.id} message={messageObj} />)}
    <div className="" ref={messagesAnchorRef}></div>
  </div>
  )
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {
  return (<div className="">
    <Avatar src={message.photo} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size={50} />
    {message.userName}
    <div className="">{message.message}</div>
    <hr />
  </div>
  )
})

const AddMessageForm: React.FC = () => {
  const dispatch = useDispatch()
  const sendMessageHandler = (values: { message: string }, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: Function}) => {
    if (!values.message) {
      return
    }

    dispatch(sendMessage(values.message))
    setSubmitting(false)
    resetForm()
  }

  // const status = useSelector((state: AppStateType) => state.chat.status)
  // const [message, setMessage] = useState('')
  // const sendMessageHandler = () => {
  //   if (!message) {
  //     return
  //   }
  //   dispatch(sendMessage(message))
  //   setMessage('')
  // }

  return (<div className="">
    {/* <textarea onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.currentTarget.value)} value={message} name="" id="" cols={30} rows={10}></textarea>
    <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button> */}
    <Formik
      enableReinitialize
      initialValues={{ message: '' }}
      validate={undefined}
      onSubmit={sendMessageHandler}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field component="textarea" name="message" id="" cols={30} rows={5} />
          <button type="submit" disabled={isSubmitting}>Send</button>
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default ChatPage
