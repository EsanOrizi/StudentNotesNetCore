import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import StudentDashboard from '../../features/students/dashboard/StudentDashboard';
import LoadingComponent from './LoadingComponent';
import StudentStore from '../stores/studentStore';
import { observer } from 'mobx-react-lite';

const App = () => {
  const studentStore = useContext(StudentStore);

  useEffect(() => {
    studentStore.loadStudents();
  }, [studentStore]);

  if (studentStore.loadingInitial) return <LoadingComponent content="Loading students..." />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <StudentDashboard />
      </Container>
    </Fragment>
  );
};
export default observer(App);
