import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import StudentDashboard from '../../features/students/dashboard/StudentDashboard';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import StudentForm from '../../features/students/form/StudentForm';
import StudentDetails from '../../features/students/details/StudentDetails';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path="/students" component={StudentDashboard} />
              <Route path="/students/:id" component={StudentDetails} />
              <Route key={location.key} path={['/createStudent', '/manage/:id']} component={StudentForm} />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};
export default withRouter(observer(App));
