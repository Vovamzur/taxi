import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Header, Segment, Form, Button } from 'semantic-ui-react';

import { useValidation } from 'containers/Auth/useValidation';
import { RootState } from 'store/types';
import { Sex } from 'types/user.types';
import { updateUser } from './actions';

const ProfilePage = withRouter(({ history }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state: RootState) => state);
  const {
    email,
    fio,
    sex,
    age,
    isEmailValid,
    isFioValid,
    isSexValid,
    isAgeValid,
    emailChanged,
    fioChanged,
    sexChanged,
    ageChanged,
    validateEmail,
    validateFio,
    validateSex,
    validateAge,
  } = useValidation();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (!profile.user) return
    const { email, fio, sex, age } = profile.user
    emailChanged(email);
    fioChanged(fio);
    sexChanged(sex);
    ageChanged(age);
  }, [profile.user]);

  const onEditCarClick = e => {
    e.stopPropagation();

    history.push('/car')
  }

  const handleSubmit = e => {
    e.preventDefault();

    const isValid = [validateEmail(), validateFio(), validateSex(), validateAge()].every(Boolean)

    if (!isValid || !profile.user) {
      return
    }
    const { id, role } = profile.user;
    dispatch(updateUser(profile.user.id, { id, role, email, fio, sex, age }));
  }

  return (
    <Grid container textAlign="center" style={{ paddingTop: 30 }}>
      <Grid.Column style={{ maxWidth: 500 }}>
        <Header as="h2" color="teal" textAlign="center">
          {`Hello, ${profile.user?.role === 'DRIVER' ? 'driver' : 'client'}`}
          <br />
          {`${profile.user?.fio}`}
        </Header>
        {profile.driver ? <Button onClick={onEditCarClick}>edit your car</Button> : null}
        <Header as="h2" color="teal" textAlign="center">
          Info about you
        </Header>
        <Form name="loginForm" size="large" onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              disabled={!isEditMode}
              icon="at"
              iconPosition="left"
              placeholder="Email"
              value={email}
              type="email"
              error={!isEmailValid}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => emailChanged(ev.target.value)}
              onBlur={validateEmail}
            />
            <Form.Input
              fluid
              disabled={!isEditMode}
              icon="lock"
              iconPosition="left"
              placeholder="Fio"
              type="text"
              value={fio}
              error={!isFioValid}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => fioChanged(ev.target.value)}
              onBlur={validateFio}
            />
            <Form.Group style={{ marginLeft: '25%' }} >
              <Form.Radio
                disabled={!isEditMode}
                error={!isSexValid}
                label='Male'
                value={Sex.MALE}
                checked={sex === Sex.MALE}
                onChange={(_, { value }) => value && sexChanged(value as Sex)}
              />
              <Form.Radio
                disabled={!isEditMode}
                error={!isSexValid}
                label='Female'
                value={Sex.FEMALE}
                checked={sex === Sex.FEMALE}
                onChange={(_, { value }) => value && sexChanged(value as Sex)}
              />
            </Form.Group>
            <Form.Input
              fluid
              disabled={!isEditMode}
              icon="address card"
              iconPosition="left"
              placeholder="Your age"
              type="number"
              value={age}
              error={!isAgeValid}
              onChange={ev => ageChanged(Number(ev.target.value))}
              onBlur={validateAge}
            />
            {
              isEditMode
                ? <Button type="submit" color="teal" fluid size="large" primary>
                    Update
                  </Button>
                : null
            }
          </Segment>
        </Form>
        <Button
          style={{ marginTop: 20 }}
          type="button"
          color="teal"
          fluid
          size="medium"
          onClick={() => setIsEditMode(mode => !mode)}
        >
          { isEditMode ? 'exit from editing mode' : 'edit your profile' }
        </Button>
      </Grid.Column>
    </Grid>
  )
});

export default ProfilePage;
