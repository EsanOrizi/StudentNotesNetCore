import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import NoteList from './NoteList';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface DetailParams {
  studentId: string;
}

const NoteDashboard: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadNotes } = rootStore.mobxStore;
  const studentId = match.params.studentId;

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

 // if (loadingInitial) return <LoadingComponent content='Loading students...' />;

  return (
    <Grid>
      <Grid.Column>
        <NoteList studentId={studentId} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(NoteDashboard);
