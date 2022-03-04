import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button as button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ChatMessageAPIType } from '../../api/chatAPI';
import { sendMessage, startMessagesListening } from '../../redux/chatReducer';
import { AppStateType } from '../../redux/redux-store';


const ChatPage: React.FC = () => {
  return (
    <Chat />
  )
}

const Chat: React.FC = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(startMessagesListening())
    }
  }, [])

  return (<>
    <Messages />
    <AddMessageForm />
  </>
  )
}

const Messages: React.FC = () => {
  const messages = useSelector((state:AppStateType) => state.chat.messages)

  return (<div className="" style={{ height: '400px', overflowY: 'auto' }}>
    {messages.map((messageObj, i) => <Message key={i} message={messageObj} />)}
  </div>
  )
}

const Message: React.FC<{ message: ChatMessageAPIType }> = ({ message }) => {
  return (<div className="">
    <Avatar src={message.photo} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size={50} />
    {message.userName}<br></br>
    {message.message}
    <hr />
  </div>
  )
}

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const status = useSelector((state: AppStateType) => state.chat.status)
  const sendMessageHandler = () => {
    if (!message) {
      return
    }
    dispatch(sendMessage(message))
    setMessage('')
  }

  // const sendMessage = (values: { message: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void; }) => {
  //   if (!values.message) {
  //     return
  //   }
  //   wsChannel.send(values.message)
  //   setSubmitting(false)
  // }

  return (<div className="">
    <textarea onChange={(e: any) => setMessage(e.currentTarget.value)} value={message} name="" id="" cols={30} rows={10}></textarea>
    <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
    {/* <Formik
      enableReinitialize
      initialValues={{ message: '' }}
      validate={undefined}
      onSubmit={sendMessage}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="textarea" name="message" id="" cols={30} rows={5} />
          <button type="submit" disabled={isSubmitting}>Send</button>
        </Form>
      )}
    </Formik> */}
  </div>
  )
}

export default ChatPage
