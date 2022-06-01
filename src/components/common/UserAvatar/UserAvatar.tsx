import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { AvatarProps } from 'antd/lib/avatar';
import React from 'react';
import styles from "./UserAvatar.module.scss";

const UserAvatar: React.FC<AvatarProps> = (props) => {
  return (
    <Avatar className={styles.avatarImg} icon={<UserOutlined />} {...props} />
  );
};

export default UserAvatar;
