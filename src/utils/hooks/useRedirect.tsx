import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsAuth } from "../../redux/reducers/authReducer/authSelectors";

export const useRedirect = () => {
  const isAuth = useSelector(selectIsAuth)

  let navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      return navigate("/login");
    }
  }, [isAuth, navigate]);
}
