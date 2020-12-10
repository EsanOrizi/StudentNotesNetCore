import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import StudentDashboard from '../../features/students/dashboard/StudentDashboard';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import StudentForm from '../../features/students/form/StudentForm';
import StudentDetails from '../../features/students/details/StudentDetails';
import NoteDashboard from '../../features/notes/dashbaord/NoteDashboard';
import NoteDetails from '../../features/notes/details/NoteDetails';
import NoteForm from '../../features/notes/form/NoteForm';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <ToastContainer position='bottom-right'/>
      <Route exact path="/" component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
              <Route exact path="/students" component={StudentDashboard} />
              <Route path="/students/:id" component={StudentDetails} />
              <Route key={location.key} path={['/createStudent', '/manageStudent/:id']} component={StudentForm} />
            
              <Route exact path="/studentNotes/:studentId" component={NoteDashboard} />
              <Route path="/notes/:id" component={NoteDetails} />
              <Route key={location.key} path={['/createNote', '/manageNote/:id']} component={NoteForm} />
             <Route component={NotFound} />
                
              </Switch>
              
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};
export default withRouter(observer(App));
