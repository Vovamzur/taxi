import React from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../../Profile/actions';
import useValidation from '../useValidation';

import styles from '../styles.module.scss';

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

  let [emailClass, passwordClass] = [[], []].map(
    () =>
      'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline',
  );
    
  return (
    <div className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui teal image header">
          <div className="content">
            Log in
          </div>
        </h2>
        <form className="ui large form" onSubmit={handleLogin} noValidate>
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
            <button type='submit' className="ui fluid large teal submit button">Login</button>
          </div>
          <div className="ui error message" />
        </form>
      </div>
    </div>
  )
}

export default LoginPage;
