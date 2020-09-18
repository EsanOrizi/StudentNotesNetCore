import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import NoteList from './NoteList';
import { observer } from 'mobx-react-lite';
import StudentStore from '../../../app/stores/studentStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RouteComponentProps } from 'react-router-dom';

interface DetailParams {
  studentId: string;
}

const NoteDashboard: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const studentStore = useContext(StudentStore);
  const studentId = match.params.studentId;

  useEffect(() => {
    studentStore.loadNotes();
  }, [studentStore]);

  if (studentStore.loadingInitial) return <LoadingComponent content="Loading students..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <NoteList studentId={studentId} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(NoteDashboard);
