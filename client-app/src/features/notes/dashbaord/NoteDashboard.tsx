import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface DetailParams {
  studentId: string;
}

const NoteDashboard: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadNotes } = rootStore.mobxStore;

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return (
    <Grid>
      <Grid.Column>
      </Grid.Column>
    </Grid>
  );
};

export default observer(NoteDashboard);
