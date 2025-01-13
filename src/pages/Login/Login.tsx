import { FormikHelpers } from 'formik';
import { useSelector } from 'react-redux';
import { setSecureConnection } from '../../api/api';
import { selectCaptchaUrl } from '../../redux/reducers/authReducer/authSelectors';
import { login } from '../../redux/reducers/authReducer/authThunks';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import { LoginForm, LoginFormValuesType } from './LoginForm';

const Login: React.FC = () => {
  const captchaUrl = useSelector(selectCaptchaUrl);

  const dispatch = useAppDispatch();

  const onSubmit = (
    formData: LoginFormValuesType,
    submitProps: FormikHelpers<LoginFormValuesType>
  ) => {
    const { email, password, rememberMe, captcha, apiKey } = formData;
    setSecureConnection(apiKey);
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
