import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import StudentList from './StudentList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import MobxStore from '../../../app/stores/mobxStore';

const StudentDashboard: React.FC = () => {
  const mobxStore = useContext(MobxStore);

  useEffect(() => {
    mobxStore.loadStudents();
  }, [mobxStore]);

  if (mobxStore.loadingInitial) return <LoadingComponent content="Loading students..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <StudentList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(StudentDashboard);
