import React from 'react';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';


const ProfilePage = withRouter(({ history }) => {
  const onEditCarClick = e => {
    e.stopPropagation();

    history.push('/car')
  }

  return (
    <div>
      profile
      <Button onClick={onEditCarClick}>edit your car</Button>
    </div>
  )
});

export default ProfilePage;
