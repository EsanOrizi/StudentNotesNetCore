import React, { useContext, useEffect } from 'react';
import { Card, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import MobxStore from '../../../app/stores/mobxStore';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface DetailParams {
  id: string;
}

const NoteDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const rootStore = useContext(RootStoreContext);
  const { note, loadingInitial, loadNote } = rootStore.mobxStore;

  useEffect(() => {
    loadNote(match.params.id);
  }, [loadNote, match.params.id]);

  if (loadingInitial) return <LoadingComponent content="Loading note" />;

  if(!note)
  return <h2>Note not Found</h2>
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{note!.name}</Card.Header>
        <Card.Description>{note!.progressRating}</Card.Description>
        <Card.Description>{note!.extraNote}</Card.Description>
        <Card.Description>{note!.dateAdded.split('T')[0]}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button as={Link} to={`/manageNote/${note.id}`} basic color="blue" content="Edit" />
          <Button onClick={() => history.push(`/studentNotes/${note.studentId}`)} basic color="grey" content="Back" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(NoteDetails);
