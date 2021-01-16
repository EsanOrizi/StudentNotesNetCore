import React, { Fragment, useContext } from 'react';
import { Container, Segment, Header, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginFrom from '../user/LoginFrom';
import RegisterFrom from '../user/RegisterForm';

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          Student Notes
        </Header>
        {isLoggedIn && user ? (
          <Fragment>
            <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
            <Button as={Link} to='/students' size='huge' inverted>
              Go to students
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as='h2' inverted content='Welcome to Student Notes' />
            <Button onClick={() => openModal(<LoginFrom />)} size='huge' inverted>
              Login
            </Button>
            <Button onClick={() => openModal(<RegisterFrom />)} size='huge' inverted>
              Register
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
