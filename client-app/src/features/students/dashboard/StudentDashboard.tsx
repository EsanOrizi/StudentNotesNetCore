import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import StudentList from './StudentList';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';

const StudentDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadStudents } = rootStore.mobxStore;

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

 // if (loadingInitial) return <LoadingComponent content='Loading students...' />;

  return (
    <Grid>
      <Grid.Column>
        <StudentList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(StudentDashboard);
