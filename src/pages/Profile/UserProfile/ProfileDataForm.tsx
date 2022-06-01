import { Field, Form, Formik, FormikHelpers } from "formik";
import { ProfileType } from "../../../types/types";
import { required } from "../../../utils/validators/validators";
import { Input, Textarea } from "../../../components/common/FormsControls/FormsControls";
import { Button, Space } from "antd";

type PropsType = {
  profile: ProfileType
  onSubmit: (formData: ProfileType, submitProps: FormikHelpers<ProfileType>) => void
}

const ProfileDataForm: React.FC<PropsType> = (props) => {
  const { profile, onSubmit } = props;

  return (<Formik
    enableReinitialize
    initialValues={profile}
    validate={undefined}
    onSubmit={onSubmit}
  >
    {/* {({ errors, touched, isValidating, isSubmitting }) => ( */}
    <Form className="user-info__description">
      <Button htmlType="submit">Save</Button>
      <div className="">
        <label className="user-info__name">
          <h3>Full name:</h3>
          <Field
            component={Input}
            type="text"
            name={"fullName"}
            placeholder="Full Name..."
            validate={required}
          />
        </label>
        <label className="user-info__job">Looking for a job:
          <Field
            component={Input}
            type="checkbox" name={"lookingForAJob"} placeholder="Looking For A Job..."
            validate={[]} />
        </label>
        {<label className="user-info__job-description">My professional skills:
          <Field component={Textarea} name={"lookingForAJobDescription"} placeholder="My professional skills..." cols={50} rows={4}
            validate={required} />
        </label>}

        <label className="user-info__job">About me:
          <Field component={Textarea} name={"aboutMe"} placeholder="About me..." cols={50} rows={4}
            validate={required} />
        </label>
      </div>
      <div className="user-info__contacts">
        <h3 className="user-info__contacts-title">Contacts: </h3>
        <Space direction="vertical">
          {Object.keys(profile.contacts)
            .map(item => {
              return <label className="contact" key={item}>

                {item}: <Field component={Input} type="text" name={"contacts." + item} placeholder={`Enter the ${item} link...`}
                  validate={[]} />

              </label>;
            })}
        </Space>
      </div>
      {/* {props.error && <div className={''}>{props.error}</div>} */}

    </Form>
    {/* )} */}
  </Formik >
  );
};

export default ProfileDataForm
