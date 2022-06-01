import { Button, Col, Divider, Image, Row, Space } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Message.module.scss'
import { DialogsMessageType } from '../../../redux/reducers/dialogsReducer/dialogsReducer';
import { addMessageToSpam, deleteMessage } from "../../../redux/reducers/dialogsReducer/dialogsThunks";
import { useDispatch } from 'react-redux';
import { RouteNames } from '../../../utils/redirectRules';
import UserAvatar from '../../../components/common/UserAvatar/UserAvatar';
import doubleTick from '../../../assets/images/double-tick.png'
import singleTick from '../../../assets/images/single-tick.png'
import moment from 'moment';

type PropsType = {
  photo: string | null | undefined,
  message: DialogsMessageType
}

const DialogMessage: React.FC<PropsType> = React.memo(({ message, photo }) => {
  const dispatch = useDispatch()
  const { senderId, senderName, viewed, body, addedAt, id } = message;

  const deleteMessageHandler = () => {
    dispatch(deleteMessage(id))
  }

  const messageDate = moment.utc(addedAt).local().format('DD.MM.YYYY, HH:mm:ss');
  // const messageDate = new Date(addedAt).toLocaleString();

  return (<div className="">
    <Divider style={{ margin: '6px 0' }}></Divider>
    <Row justify='space-between' align='middle' wrap={false}>
      <Col>
        <Space size={8}>
          <Link to={`${RouteNames.PROFILE}/${senderId}`}>
            <Space>
              <UserAvatar src={photo} size={50} />
              <span>{senderName}</span>
            </Space>
          </Link>
          <span>{messageDate}</span>
        </Space>
      </Col>
      <Col>
        <Space size={12}>
          <Image
            src={viewed ? doubleTick : singleTick}
            width={16}
            preview={false}
            title={viewed ? 'Viewed' : 'Not-viewed'}
          />
          <Button
            danger
            type="primary"
            size={'small'}
            onClick={deleteMessageHandler}
            htmlType={'button'}
            title='Delete message'>
            &times;
          </Button>
          {/* <Button danger onClick={() => { dispatch(addMessageToSpam(id)) }} htmlType={'button'}>Spam</Button> */}
        </Space>
      </Col>
    </Row>
    <div className="">{body}</div>
  </div>
  )
})

export default DialogMessage
