import { Button } from 'antd';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { Input } from '../../components/common/FormsControls/FormsControls';
import { FilterType } from '../../redux/reducers/userReducer/usersReducer';
import { selectUsersFilter } from '../../redux/reducers/userReducer/usersSelectors';

type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

type FriendType = 'true' | 'false' | 'null'

type FormType = {
  term: string
  friend: FriendType
}

export const UsersSearchForm: React.FC<PropsType> = ({ onFilterChanged }) => {
  const onSubmit = (values: FormType, formikHelpers: FormikHelpers<FormType>) => {
    const { setSubmitting } = formikHelpers;

    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
    }
    onFilterChanged(filter)
    //values: FilterType
    // onFilterChanged(values)
    setSubmitting(false);

  };

  const filter = useSelector(selectUsersFilter)

  return <div className="">
    <Formik
      enableReinitialize
      initialValues={{ term: filter.term, friend: String(filter.friend) as FriendType }}
      validate={undefined}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form style={{ display: 'flex', gap: '15px', marginBottom: '16px' }}>
          <Field component={Input} name="term" />
          {/* <ErrorMessage name="email" component="div" /> */}
          <Field name="friend" as="select">
            <option value="null">All</option>
            <option value="true">Only followed</option>
            <option value="false">Only unfollowed</option>
          </Field>
          <Button htmlType="submit" disabled={isSubmitting}>
            Find
          </Button>

        </Form>
      )}
    </Formik>
  </div>;
};
