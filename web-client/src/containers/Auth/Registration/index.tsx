import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react'

import { registration } from '../../Profile/actions';
import useValidation from '../useValidation';
import { Role, Sex } from 'types/user.types';

import styles from '../styles.module.scss';

const RegistrationPage = () => {
  const dispatch = useDispatch();

  const {
    email,
    password,
    role,
    fio,
    sex,
    age,
    isEmailValid,
    isPasswordValid,
    isRoleValid,
    isFioValid,
    isSexValid,
    isAgeValid,
    emailChanged,
    passwordChanged,
    roleChanged,
    fioChanged,
    sexChanged,
    ageChanged,
    validateEmail,
    validatePassword,
    validateRole,
    validateFio,
    validateSex,
    validateAge,
  } = useValidation();


  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = [
      validateEmail(),
      validatePassword(),
      validateFio(),
      validateRole(),
      validateSex(),
      validateAge(),
    ].every(Boolean);

    if (!isValid) return;

    dispatch(registration({ email, password, role, fio, sex, age }));
  };

  let [emailClass, passwordClass] = [[], []].map(
    () =>
      'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline',
  );
    
  return (
    <div className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui teal image header">
          <div className="content">
            Registration
          </div>
        </h2>
        <form className="ui large form" onSubmit={handleRegistration} noValidate>
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon" />
                <input
                  className={isEmailValid ? emailClass : (emailClass += ` ${styles.error}`)}
                  type="text"
                  name="email"
                  placeholder="Login"
                  value={email}
                  onChange={e => emailChanged(e.target.value)}
                  onBlur={validatePassword}
                />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input
                  className={
                    isPasswordValid ? passwordClass : (passwordClass += ` ${styles.error}`)
                  }
                  type="password"
                  name="password"
                  placeholder="********"
                  value={password}
                  onChange={(ev) => passwordChanged(ev.target.value)}
                  onBlur={validatePassword}
                />
              </div>
            </div>
            <Form.Group>
              <label>Who are you?</label>>
              <Form.Radio
                label='Driver'
                value={Role.DRIVER}
                checked={role === Role.DRIVER}
                onChange={(_, { value }) => value && roleChanged(value as Role)}
              />
              <Form.Radio
                label='Client'
                value={Role.CLIENT}
                checked={role === Role.CLIENT}
                onChange={(_ , { value }) => value && roleChanged(value as Role)}
              />
            </Form.Group>
            <Form.Group inline>
              <label>Who are you?</label>>
              <Form.Radio
                label='Male'
                value={Sex.MALE}
                checked={sex === Sex.MALE}
                onChange={(_, { value }) => value && sexChanged(value as Sex)}
              />
              <Form.Radio
                label='Female'
                value={Sex.FEMALE}
                checked={sex === Sex.FEMALE}
                onChange={(_ , { value }) => value && sexChanged(value as Sex)}
              />
            </Form.Group>
            <button
              type='submit'
              className="ui fluid large teal submit button"
            >
              Register
            </button>
          </div>
          <div className="ui error message" />
        </form>
      </div>
    </div>
  )
}

export default RegistrationPage;
