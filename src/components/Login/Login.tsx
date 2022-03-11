import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../../redux/authReducer';
import { AppStateType } from '../../redux/redux-store';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls';
import styles from '../common/FormsControls/FormsControls.module.css';

type LoginFormOwnProps = {
  captchaUrl: string | null
  onSubmit: (formData: LoginFormValuesType, submitProps: any) => void
}

const LoginForm: React.FC<LoginFormOwnProps> = (props) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ email: '' , password: '', rememberMe: true, captcha: null}}
      validate={undefined}
      onSubmit={props.onSubmit}
    >
    <Form className="" action="">
      <label htmlFor="">
        <Field component={Input} type="email" name={"email"} placeholder="E-mail"
          validate={required}
        />
      </label>
      <label htmlFor="">
        <Field component={Input} type="password" name={"password"} placeholder="password"
          validate={required}
        />
      </label>
      <label htmlFor="">
        <Field component={Input} type="checkbox" name={"rememberMe"} />
        Remember me
      </label>
      {props.captchaUrl && <div className=""><img src={props.captchaUrl} alt={"Captcha"} />
        <Field component={Input} type="text" name={"captcha"} validate={required} placeholder={'Enter symbols from the image'} />
      </div>}
      {/* {props.error && <div className={styles.formSummaryError}>{props.error}</div>} */}

      <button type="submit">Log-in</button>
    </Form>
    </Formik>
  )
}

type LoginFormValuesType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: null | string
}
// type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: React.FC = () => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

  const dispatch = useDispatch()

  const onSubmit = (formData: LoginFormValuesType, submitProps: FormikHelpers<LoginFormValuesType>) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha, submitProps.setErrors))
  }

  if (isAuth) {
    return <Navigate to="/profile" />
  }

  return (
    <div className="">
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
}

export default Login
