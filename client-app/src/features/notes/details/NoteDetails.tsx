import React, { useContext, useEffect } from 'react';
import { Card, Button, Item } from 'semantic-ui-react';
import StudentStore from '../../../app/stores/studentStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import NoteList from '../../notes/dashbaord/NoteList';

interface DetailParams {
  id: string;
}

const NoteDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const studentStore = useContext(StudentStore);
  const { note, loadingInitial, loadNote } = studentStore;

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
        <Card.Description>{note!.dateAdded}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button as={Link} to={`/manageNote/${note.id}`} basic color="blue" content="Edit" />
          <Button onClick={() => history.push('/notes')} basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(NoteDetails);
