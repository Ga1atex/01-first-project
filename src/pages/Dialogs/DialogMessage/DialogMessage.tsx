import { Button, Col, Divider, Image, Row, Space } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import doubleTick from '../../../assets/images/double-tick.png';
import singleTick from '../../../assets/images/single-tick.png';
import { RouteNames } from '../../../components/AppRoutes';
import UserAvatar from '../../../components/common/UserAvatar/UserAvatar';
import { deleteMessage } from '../../../redux/reducers/dialogsReducer/dialogsThunks';
import { DialogsMessageType } from '../../../types/types';
import { useAppDispatch } from '../../../utils/hooks/reduxHooks';

type PropsType = {
  photo: string | null | undefined;
  message: DialogsMessageType;
};

const DialogMessage: React.FC<PropsType> = React.memo(({ message, photo }) => {
  const dispatch = useAppDispatch();
  const { senderId, senderName, viewed, body, addedAt, id } = message;

  const deleteMessageHandler = () => {
    dispatch(deleteMessage(id));
  };

  const messageDate = moment
    .utc(addedAt)
    .local()
    .format('DD.MM.YYYY, HH:mm:ss');
  // const messageDate = new Date(addedAt).toLocaleString();

  return (
    <div className="">
      <Divider style={{ margin: '6px 0' }} />
      <Row justify="space-between" align="middle" wrap={false}>
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
              title="Delete message"
            >
              &times;
            </Button>
          </Space>
        </Col>
      </Row>
      <div className="">{body}</div>
    </div>
  );
});

export default DialogMessage;
