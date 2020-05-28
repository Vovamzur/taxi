import React from 'react';
import { Header as SHeader, Segment, Button, Menu } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from 'containers/Profile/actions';

type Props = {
  username: string
}

const Header = ({ username }: Props) => {
  const dispatch = useDispatch();
  return (
    <Segment clearing>
      <SHeader as="h2" floated='left'>
        <Menu>
          <Menu.Item>
            <Link to='/'>main</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/profile'>profile</Link>
          </Menu.Item>
          <Menu.Item>
            <Button onClick={e => {
              e.stopPropagation();
              dispatch(logout())
            }}>
              Logout
          </Button>
          </Menu.Item>
        </Menu>
      </SHeader>
      <SHeader as="h3" floated='right'>
        {username}
      </SHeader>
    </Segment>
  )
}

export default Header;
