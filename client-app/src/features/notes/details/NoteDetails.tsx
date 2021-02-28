import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Modal, Header, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import {format} from 'date-fns';


interface DetailParams {
  id: string;
}

const NoteDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    note,
    loadingInitial,
    loadNote,
    submitting,
    deleteNote,
  } = rootStore.mobxStore;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadNote(match.params.id);
  }, [loadNote, match.params.id]);

  if (loadingInitial) return <LoadingComponent content="Loading note" />;

  if (!note) return <h2>Note not Found</h2>;
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{note!.name}</Card.Header>
        <Card.Description>{note!.progressRating}</Card.Description>
        <Card.Description>{note!.extraNote}</Card.Description>
        <Card.Description>{format (note.dateAdded! , 'dd/MM/YYY')}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={3}>
          <Button
            as={Link}
            to={`/manageNote/${note.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push(`/studentNotes/${note.studentId}`)}
            basic
            color="grey"
            content="Back"
          />
          <Modal
            open={open}
            size="mini"
            trigger={<Button floated="right" content="Delete" color="red" />}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header content="Delete Note?" />
            <Modal.Content>
              <p>Are you sure you like to delete this note?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="red"
                loading={submitting}
                onClick={(e) => deleteNote(e, note.id).finally(() => history.push(`/studentNotes/${note.studentId}`))}
              >
                <Icon name="remove" /> YES DELETE
              </Button>
              <Button color="green" onClick={() => setOpen(false)}>
                <Icon name="checkmark" /> No
              </Button>
            </Modal.Actions>
          </Modal>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(NoteDetails);
