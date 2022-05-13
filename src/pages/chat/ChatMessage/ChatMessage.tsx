import { Avatar, Divider } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { MessageAPIType } from '../../../api/chatAPI'
import styles from './Message.module.scss'
import { UserOutlined } from '@ant-design/icons';
import { RouteNames } from '../../../utils/redirectRules'

type PropsType = {
  message: MessageAPIType,
}

const ChatMessage: React.FC<PropsType> = React.memo(({ message }) => {
  return (<div className="">
    <Divider style={{ margin: '8px 0' }}></Divider>
    <Link to={`${RouteNames.PROFILE}/${message.userId}`}>
      <Avatar src={message.photo} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size={50} />
      {message.userName}
    </Link>

    <div className="">{message.message}</div>
  </div>
  )
})

export default ChatMessage
