import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Header, Segment, Form, Button, Image } from 'semantic-ui-react';

import { useValidation } from './useValidation';
import { updateCarOfDriver } from './../Profile/actions'
import { RootState } from './../../store/types';

const CarPage = () => {
  const dispatch = useDispatch();
  const { driver } = useSelector((state: RootState) => state.profile)
  const {
    brand,
    number,
    year,
    isBrandValid,
    isNumberValid,
    isYearValid,
    brandChanged,
    numberChanged,
    yearChanged,
    validateBrand,
    validateNumber,
    validateYear
  } = useValidation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = [validateBrand(), validateNumber(), validateYear()].every(Boolean);

    if (!isValid) {
      return
    }

    dispatch(updateCarOfDriver(driver!.id, { brand, number, year }))
  }

  return (
    <Grid container textAlign="center" style={{ paddingTop: 30 }}>
      <Grid.Column>
        <Image centered src={'/images/car.jpg'} size="medium" circular />
        <br />
        <Header as="h2" color="teal" textAlign="center">
          Info about your car
        </Header>
        <Form name="loginForm" size="large" onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              icon="at"
              iconPosition="left"
              placeholder="Brand"
              type="text"
              error={!isBrandValid}
              onChange={ev => brandChanged(ev.target.value)}
              onBlur={validateBrand}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Number"
              type="text"
              error={!isNumberValid}
              onChange={ev => numberChanged(ev.target.value)}
              onBlur={validateNumber}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Manufacturing Year"
              type="number"
              error={!isYearValid}
              onChange={ev => yearChanged(+ev.target.value)}
              onBlur={validateYear}
            />
            <Button type="submit" color="teal" fluid size="large" primary>
              Update
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default CarPage;

