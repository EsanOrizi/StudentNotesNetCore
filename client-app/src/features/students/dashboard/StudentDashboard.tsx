import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import StudentList from './StudentList';
import { observer } from 'mobx-react-lite';
import StudentStore from '../../../app/stores/studentStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const StudentDashboard: React.FC = () => {
  const studentStore = useContext(StudentStore);

  useEffect(() => {
    studentStore.loadStudents();
  }, [studentStore]);

  if (studentStore.loadingInitial) return <LoadingComponent content="Loading students..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <StudentList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(StudentDashboard);
