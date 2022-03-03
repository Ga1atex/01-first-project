import { Avatar, Button } from "antd"
import React, { useEffect, useState } from "react"
//@ts-ignore
import photo from "../../assets/images/user.png"
import { LaptopOutlined, MessageOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Field, Form, Formik } from "formik";

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
  message: string,
  photo: string,
  userId: number,
  userName: string
}

const ChatPage: React.FC = () => {
  return (
    <Chat />
  )
}


const Chat: React.FC = () => {

  return (<>
    <Messages />
    <AddMessageForm />
  </>
  )
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  useEffect(() => {
    wsChannel.addEventListener('message', (e: MessageEvent) => {
      const newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    })
  }, [])

  return (<div className="" style={{ height: '400px', overflowY: 'auto' }}>
    {messages.map((messageObj, i) => <Message key={i} message={messageObj} />)}
  </div>
  )
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
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
  const sendMessage = () => {
    if (message) {
      wsChannel.send(message)
      setMessage('')
    }
  }
  return (<div className="">
    {/* <textarea onChange={(e: any) => setMessage(e.currentTarget.value)} value={message} name="" id="" cols={30} rows={10}></textarea> */}
    {/* <Button onClick={sendMessage}>Send</Button> */}
    <Formik
      enableReinitialize
      initialValues={{ message: '' }}
      validate={undefined}
      onSubmit={sendMessage}
    >
      <Form>
        <Field onChange={(e: any) => setMessage(e.currentTarget.value)} value={message} type="textarea" name="message" id="" cols={30} rows={5} />
        <Button>Send</Button>
      </Form>
    </Formik>
  </div>
  )
}

export default ChatPage
