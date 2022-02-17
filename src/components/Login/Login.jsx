import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls';
import {login} from '../../redux/authReducer'
import { Navigate } from 'react-router-dom';
import styles from '../common/FormsControls/FormsControls.module.css';


const LoginForm = (props) => {
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
      {props.captchaUrl && <div className=""><img src={props.captchaUrl} />
        <Field component={Input} type="text" name={"captcha"} validate={[required]} placeholder={'Enter symbols from the image'}/>
      </div>}
      {props.error && <div className={styles.formSummaryError}>{props.error}</div>}

    <button type="submit">Log-in</button>
    </form>
    )
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)

function Login(props) {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }

  if (props.isAuth) {
    return <Navigate to="/profile" />
  }

  return (
    <div className="">
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>

  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
  }
}

export default connect(mapStateToProps, {
  login
})(Login)
