import React, { useContext } from 'react';
import {
  Menu,
  Container,
  Button,
  Dropdown,
  Image,
} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;

  return (
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item
            header
            as={NavLink}
            exact
            to='/'
          >
            <img
              src='/assets/logo.png'
              alt='logo'
              style={{ marginRight: '10px' }}
            />
            Learner Notes
          </Menu.Item>
          <Menu.Item
            name='Students'
            as={NavLink}
            to='/students'
          />
          <Menu.Item>
            <Button
              as={NavLink}
              to='/createStudent'
              color='instagram'
              content='New Student'
            />
          </Menu.Item>
          {user && (
            <Menu.Item position='right'>
              <Image
                avatar
                spaced='right'
                src={'/assets/user.png'}
              />
              <Dropdown
                pointing='top left'
                text={user.displayName}
              >
                <Dropdown.Menu direction='left'>
                  <Dropdown.Item
                    as={Link}
                    to={`/profile/username`}
                    text='My profile'
                    icon='user'
                  />
                  <Dropdown.Item
                    onClick={logout}
                    text='Logout'
                    icon='power'
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          )}
        </Container>
      </Menu>
    </div>
  );
};

export default observer(NavBar);
