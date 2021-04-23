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
        <Header as='h2' inverted>
          <Image
            width='30'
            height='30'
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          Learner Notes
        </Header>
        {isLoggedIn && user ? (
          <Fragment>
            <Header as='h3' inverted content={`Welcome back ${user.displayName}`} />
            <Button compact as={Link} to='/students' size='big' inverted>
              Go to students
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as='h3' inverted content='Welcome to Student Notes' />
            <Button compact onClick={() => openModal(<LoginFrom />)} size='big' inverted>
              Login
            </Button>
            <Button compact onClick={() => openModal(<RegisterFrom />)} size='big' inverted>
              Register
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
