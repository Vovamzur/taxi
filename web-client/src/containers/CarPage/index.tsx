import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Header, Segment, Form, Button, Image } from 'semantic-ui-react';

import { useValidation } from './useValidation';
import { updateCarOfDriver } from './../Profile/actions'
import { RootState } from './../../store/types';

import carImage from '../../assets/images/car.jpg';

const CarPage = () => {
  const dispatch = useDispatch();
  const { driver } = useSelector((state: RootState) => state.profile)
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
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
  } = useValidation(driver?.car || undefined);

  useEffect(() => {
    if (!driver || !driver.car) return
    const { brand, number, year } = driver.car
    brandChanged(brand)
    numberChanged(number)
    yearChanged(year)
  }, [driver, brandChanged, numberChanged, yearChanged])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = [validateBrand(), validateNumber(), validateYear()].every(Boolean);
    
    if (!isValid) {
      return
    }

    dispatch(updateCarOfDriver({ brand, number, year }))
  }

  return (
    <Grid container textAlign="center" style={{ paddingTop: 30 }}>
      <Grid.Column style={{ maxWidth: 500 }}>
        <Image centered src={carImage} size="medium" circular />
        <br />
        <Header as="h2" color="teal" textAlign="center">
          Info about your car
        </Header>
        <Form name="loginForm" size="large" onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              disabled={!isEditMode}
              icon="at"
              iconPosition="left"
              placeholder="Brand"
              value={brand}
              type="text"
              error={!isBrandValid}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => brandChanged(ev.target.value)}
              onBlur={validateBrand}
            />
            <Form.Input
              fluid
              disabled={!isEditMode}
              icon="lock"
              iconPosition="left"
              placeholder="Number"
              type="text"
              value={number}
              error={!isNumberValid}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => numberChanged(ev.target.value)}
              onBlur={validateNumber}
            />
            <Form.Input
              fluid
              disabled={!isEditMode}
              icon="lock"
              iconPosition="left"
              placeholder="Manufacturing Year"
              type="number"
              value={year}
              error={!isYearValid}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => yearChanged(+ev.target.value)}
              onBlur={validateYear}
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
          { isEditMode ? 'exit from editing mode' : 'edit car' }
        </Button>
      </Grid.Column>
    </Grid>
  )
}

export default CarPage;

