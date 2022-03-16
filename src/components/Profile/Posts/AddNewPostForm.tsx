import { Field, Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

export const maxLength20 = maxLengthCreator(20);

export type AddPostFormValuesType = {
  onSubmit: (values: FormikValues) => void
}

const AddNewPostForm: React.FC<AddPostFormValuesType> = (props) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ newPostValue: '' }}
      validate={undefined}
      onSubmit={props.onSubmit}
    >
      <Form className="posts__new-post">
        <Field className="posts__textarea" cols="50" rows="10" placeholder='Your news...'
          name="newPostValue"
          component={Textarea}
          validate={[required, maxLength20]} />
        <button className="posts__btn" type="submit">Send</button>
      </Form>
    </Formik>
  );
};

export default AddNewPostForm;
