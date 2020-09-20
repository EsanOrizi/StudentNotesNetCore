import React, { useContext, useEffect } from 'react';
import { Card, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import MobxStore from '../../../app/stores/mobxStore';

interface DetailParams {
  id: string;
}

const NoteDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const mobxStore = useContext(MobxStore);
  const { note, loadingInitial, loadNote } = mobxStore;

  useEffect(() => {
    loadNote(match.params.id);
  }, [loadNote, match.params.id]);

  if (loadingInitial || !note) return <LoadingComponent content="Loading note" />;
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
