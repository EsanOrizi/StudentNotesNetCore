import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header as={NavLink} exact to="/">
            <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
            StudentNotes
          </Menu.Item>
          <Menu.Item name="Students" as={NavLink} to="/students" />
          <Menu.Item>
            <Button as={NavLink} to="/createStudent" positive content="New Student" />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default observer(NavBar);
