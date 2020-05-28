import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Header, Message, Segment, Form, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import { registration } from '../../Profile/actions';
import { useValidation } from '../useValidation';
import { Role, Sex } from 'types/user.types';

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
    isConfirmPasswordValid,
    isRoleValid,
    isFioValid,
    isSexValid,
    isAgeValid,
    emailChanged,
    passwordChanged,
    confirmPasswordChanged,
    roleChanged,
    fioChanged,
    sexChanged,
    ageChanged,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
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
      validateConfirmPassword(),
      validateFio(),
      validateRole(),
      validateSex(),
      validateAge(),
    ].every(Boolean);

    if (!isValid) return;

    dispatch(registration({ email, password, role, fio, sex, age }));
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="fill">
      <Grid.Column style={{ maxWidth: 450 }}>
        <div style={{ marginTop: '200px' }} />
        <Header as="h2" color="teal" textAlign="center">
          Register for free account
      </Header>
        <Form name="registrationForm" size="large" onSubmit={handleRegistration}>
          <Segment>
            <Form.Group style={{ marginLeft: '25%' }}>
              <Form.Radio
                error={!isRoleValid}
                label='Driver'
                value={Role.DRIVER}
                checked={role === Role.DRIVER}
                onChange={(_, { value }) => value && roleChanged(value as Role)}
              />
              <Form.Radio
                error={!isRoleValid}
                label='Client'
                value={Role.CLIENT}
                checked={role === Role.CLIENT}
                onChange={(_, { value }) => value && roleChanged(value as Role)}
              />
            </Form.Group>
            <Form.Group style={{ marginLeft: '25%' }}>
              <Form.Radio
                error={!isSexValid}
                label='Male'
                value={Sex.MALE}
                checked={sex === Sex.MALE}
                onChange={(_, { value }) => value && sexChanged(value as Sex)}
              />
              <Form.Radio
                error={!isSexValid}
                label='Female'
                value={Sex.FEMALE}
                checked={sex === Sex.FEMALE}
                onChange={(_, { value }) => value && sexChanged(value as Sex)}
              />
            </Form.Group>
            <Form.Input
              fluid
              icon="at"
              iconPosition="left"
              placeholder="Email"
              type="email"
              error={!isEmailValid}
              onChange={ev => emailChanged(ev.target.value)}
              onBlur={validateEmail}
            />
            <Form.Input
              fluid
              icon="address card"
              iconPosition="left"
              placeholder="Full FIO"
              type="text"
              error={!isFioValid}
              onChange={ev => fioChanged(ev.target.value)}
              onBlur={validateFio}
            />
            <Form.Input
              fluid
              icon="address card"
              iconPosition="left"
              placeholder="Your age"
              type="number"
              error={!isAgeValid}
              onChange={ev => ageChanged(Number(ev.target.value))}
              onBlur={validateAge}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              error={!isPasswordValid}
              onChange={ev => passwordChanged(ev.target.value)}
              onBlur={validatePassword}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Confrim password"
              type="password"
              error={!isConfirmPasswordValid}
              onChange={ev => confirmPasswordChanged(ev.target.value)}
              onBlur={validateConfirmPassword}
            />
            <Button type="submit" color="teal" fluid size="large" primary>
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Alredy with us?
        {' '}
          <NavLink exact to="/login">Sign In</NavLink>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default RegistrationPage;
