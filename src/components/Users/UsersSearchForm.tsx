import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { FilterType } from '../../redux/usersReducer';
import { getUsersFilter } from '../../redux/usersSelectors';

type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

type FriendType = 'true' | 'false' | 'null'

type FormType = {
  term: string
  friend: FriendType
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

  const filter = useSelector(getUsersFilter)

  return <div className="">
    <Formik
      enableReinitialize
      initialValues={{ term: filter.term, friend: String(filter.friend) as FriendType }}
      validate={undefined}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form style={{display: 'flex', gap: '15px', marginBottom: '16px'}}>
          <Field type="text" name="term" />
          {/* <ErrorMessage name="email" component="div" /> */}
          <Field name="friend" as="select">
            <option value="null">All</option>
            <option value="true">Only followed</option>
            <option value="false">Only unfollowed</option>
          </Field>
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>

        </Form>
      )}
    </Formik>
  </div>;
};
