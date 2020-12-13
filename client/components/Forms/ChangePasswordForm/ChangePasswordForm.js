import React from 'react';
import {Formik, Form} from 'formik';
import {LockIcon} from '../FormElements/FormStyles';
import {ChangePasswordFormStyles, StyledInputField} from './styles';
import * as Yup from 'yup';
import {useMutation} from '@apollo/react-hooks';
import {gql} from '@apollo/client';
import ErrorBanner from '../../ErrorBanner';


const CHANGE_PASSWORD_MUTATION = gql`
    mutation CHANGE_PASSWORD_MUTATION($currentPassword: String!, $newPassword: String!) {
        changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
            message
        }
    }
`

const ChangePasswordForm = () => {

  const [changePassword, {data, loading, error}] = useMutation(CHANGE_PASSWORD_MUTATION);
   return (
    <ChangePasswordFormStyles>
          <Formik
              initialValues={{
                  confirmOldPassword: '',
                  newPassword: '',
                  confirmNewPassword: '',
              }}
              validationSchema={Yup.object({
                  password: Yup.string()
                      .required('Current password is required'),
                  newPassword: Yup.string()
                      .matches(
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number'
                      )
                      .required('Password is required'),
                  confirmNewPassword: Yup.string().test(
                      'match',
                      'Passwords should match',
                      function (passwordConfirmation) {
                          console.log('passwordConfirmation: ', passwordConfirmation);
                          return passwordConfirmation === this.parent.newPassword;
                      }
                  )
              })}
              onSubmit={(values, actions) => {
                changePassword({variables: {
                    currentPassword: values.password,
                    newPassword: values.newPassword
                }});
                actions.resetForm();
              }}
          >
              <Form>
     
                      {error && <ErrorBanner error={error.message} />}
                      <h2>Change Password</h2>
                      <fieldset disabled={loading}>
                          <StyledInputField
                              type="password"
                              label="Current Password"
                              name="password"
                              placeholder="Enter current your password"
                              iconInputField
                              icon={() => <LockIcon />}
                          />
                          <StyledInputField
                              type="password"
                              label="New Password"
                              name="newPassword"
                              placeholder="Enter your new Password"
                              iconInputField
                              icon={() => <LockIcon />}
                          />
                         <StyledInputField
                              type="password"
                              label="Confirm New Password"
                              name="confirmNewPassword"
                              placeholder="Confirm New Password"
                              iconInputField
                              icon={() => <LockIcon />}
                          />
                          <button type="submit">
                              {'Change Password'}
                          </button>
                      </fieldset>
              </Form>
          </Formik>
    </ChangePasswordFormStyles>)
}

export default ChangePasswordForm