import { FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from "../../redux/reducers/authReducer/authThunks";
import { selectCaptchaUrl, selectIsAuth } from '../../redux/reducers/authReducer/authSelectors';
import styles from './Login.module.scss'
import { LoginFormValuesType, LoginForm } from './LoginForm';
import { RouteNames } from '../../components/AppRoutes';

// type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: React.FC = () => {
  const captchaUrl = useSelector(selectCaptchaUrl)
  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch()

  const onSubmit = (formData: LoginFormValuesType, submitProps: FormikHelpers<LoginFormValuesType>) => {
    const { email, password, rememberMe, captcha } = formData;

    dispatch(login({ email, password, rememberMe, captcha, setErrors: submitProps.setErrors }))
  }

  if (isAuth) {
    return <Navigate to={RouteNames.PROFILE} />
  }

  return (
    <div className="">
      <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
}

export default Login
