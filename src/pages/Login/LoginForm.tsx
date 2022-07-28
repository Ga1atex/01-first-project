import { Field, Form, Formik, FormikHelpers } from 'formik';
import { required } from '../../utils/validators/validators';
import { Button, Card, Space } from 'antd';
import { Input } from '../../components/common/FormsControls/FormsControls';

type LoginFormOwnProps = {
  captchaUrl: string | null;
  onSubmit: (formData: LoginFormValuesType, submitProps: FormikHelpers<LoginFormValuesType>) => void;
};
export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: null | string;
};
export const LoginForm: React.FC<LoginFormOwnProps> = (props) => {
  const { onSubmit, captchaUrl } = props;
  return (
    <Card title={"Login"}>
      <Formik
        enableReinitialize
        initialValues={{ email: '', password: '', rememberMe: true, captcha: '' } as LoginFormValuesType}
        validate={undefined}
        onSubmit={onSubmit}
      >
        <Form className="" action="">
          <Space direction='vertical'>
            <label>
              <Field component={Input} type="email" name={"email"} placeholder="E-mail"
                validate={required} />
            </label>
            <label htmlFor="">
              <Field component={Input} type="password" name={"password"} placeholder="password"
                validate={required} />
            </label>
            <label htmlFor="">
              <Space size={0}>
                <Field component={Input} type="checkbox" name={"rememberMe"} />
                <span> Remember me</span>
              </Space>
            </label>
            {captchaUrl && <div className="">
              <img src={captchaUrl} alt={"Captcha"} />
              <Field component={Input} type="text" name={"captcha"} validate={required} placeholder={'Enter symbols from the image'} />
            </div>}
            {/* {props.error && <div className={styles.formSummaryError}>{props.error}</div>} */}

            <Button type='primary' htmlType='submit'>Log-in</Button>
          </Space>
        </Form>
      </Formik>
    </Card>
  );
};
