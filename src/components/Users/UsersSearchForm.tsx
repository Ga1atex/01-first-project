import { Field, Form, Formik } from 'formik';
import React from 'react';
import { FilterType } from '../../redux/usersReducer';

type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

type FormType = {
  term: string
  friend: "true" | "false" | "null"
}
export const UsersSearchForm: React.FC<PropsType> = (props) => {
  const onSubmit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void; }) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
    }
    props.onFilterChanged(filter)
    //values: FilterType
    // props.onFilterChanged(values)
    setSubmitting(false);

  };
  return <div className="">
    <Formik
      initialValues={{ term: '', friend: 'null' }}
      validate={undefined}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="term" />
          {/* <ErrorMessage name="email" component="div" /> */}
          {/* <Field type="checkbox" name="password" /> */}
          <Field name="friend" as="select">
            <option value="null">All</option>
            <option value="true">Only followed</option>
            <option value="false">Only unfollowed</option>
          </Field>
          {/* <ErrorMessage name="password" component="div" /> */}
          <button type="submit" disabled={isSubmitting}>
            Find
          </button>
        </Form>
      )}
    </Formik>
  </div>;
};
