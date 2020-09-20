import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import NoteList from './NoteList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RouteComponentProps } from 'react-router-dom';
import MobxStore from '../../../app/stores/mobxStore';

interface DetailParams {
  studentId: string;
}

const NoteDashboard: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const mobxStore = useContext(MobxStore);
  const studentId = match.params.studentId;

  useEffect(() => {
    mobxStore.loadNotes();
  }, [mobxStore]);

  if (mobxStore.loadingInitial) return <LoadingComponent content="Loading students..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <NoteList studentId={studentId} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(NoteDashboard);
