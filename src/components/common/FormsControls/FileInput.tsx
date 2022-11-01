import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadProps } from 'antd';
import React from 'react';

const FileInput: React.FC<UploadProps> = (props) => {
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default FileInput;
