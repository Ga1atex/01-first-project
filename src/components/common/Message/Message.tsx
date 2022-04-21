import { Avatar, Divider } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { MessageAPIType } from '../../../api/chatAPI'
import styles from './Message.module.scss'
import { UserOutlined } from '@ant-design/icons';

const Message: React.FC<{ message: MessageAPIType }> = React.memo(({ message }) => {
  return (<div className="">
    <Link to={`/profile/${message.userId}`}>
      <Avatar src={message.photo} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size={50} />
      {message.userName}
    </Link>

    <div className="">{message.message}</div>
    <Divider style={{ margin: '12px 0' }}></Divider>
  </div>
  )
})

export default Message
