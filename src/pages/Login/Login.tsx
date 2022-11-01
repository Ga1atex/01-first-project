import { FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/reducers/authReducer/authThunks';
import { selectCaptchaUrl } from '../../redux/reducers/authReducer/authSelectors';
import styles from './Login.module.scss';
import { LoginFormValuesType, LoginForm } from './LoginForm';

const Login: React.FC = () => {
  const captchaUrl = useSelector(selectCaptchaUrl);

  const dispatch = useDispatch();

  const onSubmit = (
    formData: LoginFormValuesType,
    submitProps: FormikHelpers<LoginFormValuesType>
  ) => {
    const { email, password, rememberMe, captcha } = formData;

    dispatch(
      login({
        email,
        password,
        rememberMe,
        captcha,
        setErrors: submitProps.setErrors,
      })
    );
  };

  return <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />;
};

export default Login;
