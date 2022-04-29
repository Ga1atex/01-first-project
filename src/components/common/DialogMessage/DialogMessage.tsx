import { Avatar, Button, Col, Divider, Row, Space } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Message.module.scss'
import { UserOutlined } from '@ant-design/icons';
import { addMessageToSpam, deleteMessage, DialogsMessageType } from '../../../redux/reducers/dialogsReducer/dialogsReducer';
import { useDispatch } from 'react-redux';
import { RouteNames } from '../../../App';

type PropsType = {
  photo: string | null,
  message: DialogsMessageType
}

const DialogMessage: React.FC<PropsType> = React.memo(({ message, photo }) => {
  const dispatch = useDispatch()

  return (<div className="">
    <Row justify='space-between'>
      <Space size={8}>
        <Link to={`/${RouteNames.PROFILE}/${message.senderId}`}>
          <Avatar src={photo} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size={50} />
          {message.senderName}
        </Link>
        <span>{new Date(message.addedAt).toLocaleString()}</span>
      </Space>
      <Col>
        <Space size={12}>
          <span>{message.viewed ? 'Viewed' : 'Not-viewed'}</span>
          <Button danger type="primary" size={'small'} onClick={() => { dispatch(deleteMessage(message.id)) }} htmlType={'button'} title='Delete message'>&times;</Button>
          {/* <Button danger onClick={() => { dispatch(addMessageToSpam(message.id)) }} htmlType={'button'}>Spam</Button> */}
        </Space>
      </Col>
    </Row>
    <div className="">{message.body}</div>
    <Divider style={{ margin: '12px 0' }}></Divider>
  </div>
  )
})

export default DialogMessage
