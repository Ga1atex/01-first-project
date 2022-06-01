import React from "react";
import { Navigate } from "react-router-dom";
import { useRedirect } from "../../utils/hooks/useRedirect";

export const RedirectHandler: React.FC = ({ children }) => {
  const { redirect } = useRedirect();

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return <>{children}</>;
};
