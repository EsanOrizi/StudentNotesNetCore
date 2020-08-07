import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  openCreateForm: () => void;
}

const NavBar: React.FC<IProps> = ({ openCreateForm }) => {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <img
              src="/assets/logo.png"
              alt="logo"
              style={{ marginRight: "10px" }}
            />
            StudentNotes
          </Menu.Item>
          <Menu.Item name="Students" />
          <Menu.Item>
            <Button onClick={openCreateForm} positive content="New Student" />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default NavBar;
