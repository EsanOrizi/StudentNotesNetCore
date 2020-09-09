import React from 'react';
import { Container, Segment, Header, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image size="massive" src="/assets/logo.png" alt="logo" style={{ marginBottom: 12 }} />
          Student Notes
        </Header>
        <Header as="h2" inverted content="Welcome to Student Notes" />
        <Button as={Link} to="/students" size="huge" inverted>
          Take me to Students!
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePage;