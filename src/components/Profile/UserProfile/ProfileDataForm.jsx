import { Field, reduxForm } from "redux-form";
import { required } from "../../../utils/validators/validators";
import { Input, Textarea } from "../../common/FormsControls/FormsControls";

const ProfileDataForm = (props) => {
  return (<><form className="user-info__description" onSubmit={props.handleSubmit}>
    <button onClick={props.goToEditMode}>Save</button>
    <div>
      <label className="user-info__name">Full name:
        <Field component={Input} type="text" name={"fullName"} placeholder="Full Name..."
          validate={[required]} />
      </label>
      <label className="user-info__job">Looking for a job:
        <Field component={Input} type="checkbox" name={"lookingForAJob"} placeholder="Looking For A Job..."
          validate={[]} />
      </label>
      {<label className="user-info__job-description">My professional skills:
        <Field component={Textarea} name={"lookingForAJobDescription"} placeholder="My professional skills..." cols={50} rows={4}
          validate={[required]} />
      </label>}

      <label className="user-info__job">About me:
        <Field component={Textarea} name={"aboutMe"} placeholder="About me..." cols={50} rows={4}
          validate={[required]} />
      </label>
    </div>
    <div className="user-info__contacts">
      <h3 className="user-info__contacts-title"></h3>
      {Object.keys(props.profile.contacts)
        .map(item => {
          return <label className="contact" key={item}>
            {item}: <Field component={Input} type="text" name={"contacts." + item} placeholder={`Enter the ${item} link...`}
              validate={[]} />
          </label>;
        })}
    </div>
    {props.error && <div className={''}>{props.error}</div>}

  </form>
  </>);
};

export default reduxForm({
  form: 'edit-profile'
})(ProfileDataForm);
