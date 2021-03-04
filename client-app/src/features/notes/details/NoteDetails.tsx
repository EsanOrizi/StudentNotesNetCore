import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Modal, Header, Icon, Item } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { format } from "date-fns";

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
      <Card.Content header={note!.name} />
      <Item.Extra>
        <Card.Description>
          {`Progress ` + note!.progressRating}
        </Card.Description>
        <Card.Description>{`Note ` + note!.extraNote}</Card.Description>
        <Card.Description>
          {`Date ` + format(note.dateAdded!, "dd/MM/YYY")}
        </Card.Description>
      </Item.Extra>

      <Card.Content extra>
        <Item.Extra>
          <Button
            onClick={() => history.push(`/studentNotes/${note.studentId}`)}
            basic
            floated="left"
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
                floated="right"
                color="red"
                loading={submitting}
                onClick={(e) =>
                  deleteNote(e, note.id).finally(() =>
                    history.push(`/studentNotes/${note.studentId}`)
                  )
                }
              >
                <Icon name="remove" /> YES DELETE
              </Button>
              <Button color="green" onClick={() => setOpen(false)}>
                <Icon name="checkmark" /> No
              </Button>
            </Modal.Actions>
          </Modal>

          <Button
            as={Link}
            to={`/manageNote/${note.id}`}
            basic
            floated="right"
            color="blue"
            content="Edit"
          />
        </Item.Extra>
      </Card.Content>
    </Card>
  );
};

export default observer(NoteDetails);
