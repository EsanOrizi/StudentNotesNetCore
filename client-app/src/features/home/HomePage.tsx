import React from 'react';
import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container style={{ marginTop: '7em' }}>
      <h1>home page</h1>
      <h3>
        Go to <Link to="/students">Students</Link>
      </h3>
    </Container>
  );
};

export default HomePage;
