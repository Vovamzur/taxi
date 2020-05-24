import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Header, Message, Segment, Form, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import { login } from '../../Profile/actions';
import useValidation from '../useValidation';

const LoginPage = () => {
  const dispatch = useDispatch();

  const {
    email,
    password,
    isEmailValid,
    isPasswordValid,
    emailChanged,
    passwordChanged,
    validateEmail,
    validatePassword,
  } = useValidation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = [validateEmail(), validatePassword()].every(Boolean);

    if (!valid) {
      return;
    }
    dispatch(login({ email, password }));
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="fill">
      <Grid.Column style={{ maxWidth: 450 }}>
        <div style={{ marginTop: '250px' }} />
        <Header as="h2" color="teal" textAlign="center">
          Login to your account
        </Header>
        <Form name="loginForm" size="large" onSubmit={handleLogin}>
          <Segment>
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
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              error={!isPasswordValid}
              onChange={ev => passwordChanged(ev.target.value)}
              onBlur={validatePassword}
            />
            <Button type="submit" color="teal" fluid size="large" primary>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us?
          {' '}
          <NavLink exact to="/registration">Sign Up</NavLink>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default LoginPage;
