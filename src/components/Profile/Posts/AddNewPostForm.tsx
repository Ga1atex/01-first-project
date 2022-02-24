import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

export const maxLength20 = maxLengthCreator(20);

type PropsType = {

}

export type AddPostFormValuesType = {
  newPostValue: string
}

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType > = (props) => {
  return (
    <form className="posts__new-post" onSubmit={props.handleSubmit}>
      <Field className="posts__textarea" cols="50" rows="10" placeholder='Your news...'
        name="newPostValue"
        component={Textarea}
        validate={[required, maxLength20]} />
      <button className="posts__btn" type="submit">Send</button>
    </form>
  );
};

export default reduxForm<AddPostFormValuesType, PropsType>({
  form: "addNewPostForm"
})(AddNewPostForm);
