import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import Map from './../Map';
import { RootState } from 'store/types';
import { Role } from 'types/user.types';

const MainPage = () => {
  const { user, driver } = useSelector((state: RootState) => state.profile);
  if (user?.role === Role.DRIVER && !driver?.car) {
    return (
      <Grid textAlign="center" verticalAlign="middle" className="fill">
        <Grid.Column style={{ maxWidth: 450 }}>
          <div style={{ marginTop: '300px' }} />
          Your are the dirver that doesn't have car info. Please enter it on car page
          <Link to='/car'><h3>Car page</h3></Link>
        </Grid.Column>
      </Grid>
    )
  }
  return (
    <Grid>
      main page
    </Grid>
  )
};

export default MainPage;
