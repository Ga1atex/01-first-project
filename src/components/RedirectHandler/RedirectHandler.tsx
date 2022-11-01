import React, { HTMLAttributes } from 'react';
import { Navigate } from 'react-router-dom';
import { useRedirect } from '../../utils/hooks/useRedirect';

export const RedirectHandler: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => {
  const { shouldRedirect, redirectPath } = useRedirect();

  if (shouldRedirect) {
    return <Navigate to={redirectPath} />;
  }

  return <>{children}</>;
};
