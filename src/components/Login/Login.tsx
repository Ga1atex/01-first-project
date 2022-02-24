import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { login } from '../../redux/authReducer';
import { AppStateType } from '../../redux/redux-store';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls';
//  @ts-ignore
import styles from '../common/FormsControls/FormsControls.module.css';

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
  return (
    <form className="" action="" onSubmit={props.handleSubmit}>
      <label htmlFor="">
        <Field component={Input} type="email" name={"email"} placeholder="E-mail"
          validate={[required]}
        />
      </label>
      <label htmlFor="">
        <Field component={Input} type="password" name={"password"} placeholder="password"
          validate={[required]}
        />
      </label>
      <label htmlFor="">
        <Field component={Input} type="checkbox" name={"rememberMe"} />
        Remember me
      </label>
      {props.captchaUrl && <div className=""><img src={props.captchaUrl} alt={"Captcha"} />
        <Field component={Input} type="text" name={"captcha"} validate={[required]} placeholder={'Enter symbols from the image'} />
      </div>}
      {props.error && <div className={styles.formSummaryError}>{props.error}</div>}

      <button type="submit">Log-in</button>
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: 'login'
})(LoginForm)

type MapStateToPropsType = {
  isAuth: boolean,
  captchaUrl: string | null
}
type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: null | string) => void
}
type PropsType = MapStateToPropsType & MapDispatchPropsType

type LoginFormValuesType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: null | string
}
// type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: React.FC<PropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }

  if (props.isAuth) {
    return <Navigate to="/profile" />
  }

  return (
    <div className="">
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>

  );
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
  }
}

export default connect(mapStateToProps, {
  login
})(Login)
