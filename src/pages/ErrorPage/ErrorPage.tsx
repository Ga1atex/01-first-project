import { Button, Result } from 'antd';
import { ResultProps } from 'antd/lib/result';
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC<ResultProps> = ({ status, title = 'Error', subTitle = "Sorry, something went wrong." }) => {
  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={<Link to={'/'}><Button type="primary">Back Home</Button></Link>}
    />
  );
};

export default ErrorPage;
