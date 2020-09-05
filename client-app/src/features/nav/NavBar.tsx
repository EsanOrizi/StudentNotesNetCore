import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import StudentStore from '../../app/stores/studentStore';
import { observer } from 'mobx-react-lite';

const NavBar: React.FC = () => {
  const studentStore = useContext(StudentStore);
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
            StudentNotes
          </Menu.Item>
          <Menu.Item name="Students" />
          <Menu.Item>
            <Button onClick={studentStore.openCreateForm} positive content="New Student" />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default observer(NavBar);
