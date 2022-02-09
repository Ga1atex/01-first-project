import { Field, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls';

const LoginForm = (props) => {
  return (
    <form className="" action="" onSubmit={props.handleSubmit}>
    <label htmlFor="">
        <Field component={Input} type="text" name={"login"} placeholder="login"
          validate={[required]}
          />
    </label>
    <label htmlFor="">
        <Field component={Input} type="text" name={"password"} placeholder="password"
          validate={[required]}
          />
    </label>
    <label htmlFor="">
        <Field component={Input} type="checkbox" name={"rememberMe"}/>
      Remember me
    </label>
    <button type="submit">Log-in</button>
    </form>
    )
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)

export default function Login(props) {
  const onSubmit = (formData) => {
    console.log(formData);
  }
  return (
    <div className="">
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>

  );
}
